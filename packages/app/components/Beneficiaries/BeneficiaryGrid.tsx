import { BeneficiaryApplication } from '@popcorn/contracts/adapters';
import CardGridHeader from 'components/CardGridHeader';
import Navbar from 'components/NavBar/NavBar';
import { useState } from 'react';
import BeneficiaryCard from './BeneficiaryCard';

interface BeneficiaryGridProps {
  beneficiaries: BeneficiaryApplication[];
  subtitle: string;
  title: string;
}

const BeneficiaryGrid: React.FC<BeneficiaryGridProps> = ({
  beneficiaries,
  subtitle,
  title,
}: BeneficiaryGridProps) => {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const filteredBeneficiaries = beneficiaries?.filter((beneficiary) => {
    return beneficiary.organizationName
      .toLowerCase()
      .includes(searchFilter.toLowerCase());
  });
  return (
    <div className="w-full  bg-gray-900 pb-16">
      <Navbar />
      <CardGridHeader title={title} subtitle={subtitle} />
      <div className="grid grid-cols-2 gap-4 items-center justify-start ml-36 mr-64 my-4 h-1/2">
        <div className="sm:w-full sm:max-w-md lg:mt-0 lg:flex-1">
          <form className="sm:flex">
            <input
              type="search"
              name="searchfilter"
              className="w-full border-white px-5 py-3 placeholder-warm-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyan-700 focus:ring-white rounded-md"
              placeholder={'Search ' + title}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </form>
        </div>
      </div>

      {filteredBeneficiaries.length === 0 ? (
        <div className="h-80">
          <p className="mt-12 text-center text-xl text-white">
            No beneficiaries containing your search terms were found.
          </p>
        </div>
      ) : (
        <ul className="sm:grid sm:grid-cols-2 gap-x-2 gap-y-12 lg:grid-cols-3 mx-36">
          {filteredBeneficiaries.map((beneficiary) => (
            <BeneficiaryCard beneficiary={beneficiary} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BeneficiaryGrid;
