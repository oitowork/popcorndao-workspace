import { getIpfsHashFromBytes32 } from '@popcorn/utils/ipfsHashManipulation';
import BeneficiaryGrid from 'components/BeneficiaryGrid';
import { ContractsContext } from 'context/Web3/contracts';

import { BeneficiaryCardProps } from 'interfaces/beneficiaries';
import { useContext, useEffect, useState } from 'react';

export default function BeneficiaryPageWrapper(): JSX.Element {
  const { contracts } = useContext(ContractsContext);
  const [takedownProposals, setTakedownProposals] = useState<BeneficiaryCardProps[]>([]);

  async function getProposals() {
    
    const proposals = await contracts.beneficiaryGovernance.getTakedownProposals();

    const proposalsData = await Promise.all(
      proposals.map(async (proposal) => {
        const ipfsData = await fetch(
          `${process.env.IPFS_URL}${getIpfsHashFromBytes32(
            proposal.applicationCid,
          )}`,
        ).then((response) => response.json());

        const deadline = new Date((Number(proposal.startTime.toString()) +
          Number(proposal.configurationOptions.votingPeriod.toString()) +
          Number(proposal.configurationOptions.vetoPeriod.toString()))*1000)

        return {
          name: ipfsData.name,
          missionStatement: ipfsData.missionStatement,
          twitterUrl: ipfsData.twitterUrl,
          linkedinUrl: ipfsData.linkedinUrl,
          facebookUrl: ipfsData.facebookUrl,
          instagramUrl: ipfsData.instagramUrl,
          githubUrl: ipfsData.githubUrl,
          ethereumAddress: ipfsData.ethereumAddress,
          profileImage: `${process.env.IPFS_URL}${ipfsData.profileImage}`,
          votesFor: proposal.yesCount,
          votesAgainst: proposal.noCount,
          status: Number(proposal.status.toString()),
          stageDeadline: deadline
        };
      }),
    );
    setTakedownProposals(proposalsData);
  }

  useEffect(() => {
    if (contracts) {
      getProposals();
    }
  }, [contracts]);
  
  return (
    <BeneficiaryGrid
      title={'Takedown Proposals'}
      subtitle={
        'Takedowns have been triggered against the following beneficiaries. Browse and vote in takedown elections.'
      }
      isProposal={true}
      cardProps={takedownProposals}
    />
  );
}
