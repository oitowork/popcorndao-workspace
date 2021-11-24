import { Dialog, Transition } from '@headlessui/react';
import { CatPool } from '@popcorn/ui/components/CatPool';
import { Rocket } from '@popcorn/ui/components/Rocket';
import FacebookPixel from 'components/FacebookPixel';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Facebook, GitHub,  Twitter, X } from 'react-feather';
import * as Icon from 'react-feather';
import { MobileExpandableMenu } from 'components/MobileExpandableMenu';

import Burger from 'components/Burger'
import Menu from 'components/Menu'
import FocusLock from 'react-focus-lock';
import { useOnClickOutside } from '../hooks';

const IndexPage = () => {
  const router = useRouter();
  const endDate = 1638172800000; //Nov 29, 08.00.00 UTC
  const [countdown, setCountdown] = useState<number[]>([]);
  const [countdownActive, disableCountdown] = useState<boolean>(true);
  const [menuVisible, toggleMenu] = useState<boolean>(false);
  const [ctaModalVisible, toggleCtaModal] = useState<boolean>(false);


  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";


  useOnClickOutside(node, () => setOpen(false));

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (countdownActive) {
      calcAndSetCountdown();
      setInterval(function () {
        calcAndSetCountdown();
      }, 1000);
    }
  }, []);

  function calcAndSetCountdown(): void {
    const now = new Date().getTime();

    const distance = endDate - now;
    if (distance < 0) {
      disableCountdown(false);
      setCountdown([0, 0, 0, 0]);
    }

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountdown([days, hours, minutes, seconds]);
  }

  return (
    <div className="font-landing">
      <FacebookPixel />
      {/* Modal to display signup form*/}
      <Transition.Root show={ctaModalVisible} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={(e) => toggleCtaModal(false)}
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 text-center pb-60 sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                style={{ backdropFilter: 'blur(5px)' }}
              />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block w-full align-middle transition-all transform md:w-1/2 xl:w-1/3">
                <form
                  action="https://network.us1.list-manage.com/subscribe/post?u=5ce5e82d673fd2cfaf12849a5&amp;id=e85a091ed3"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate"
                  target="_blank"
                  noValidate
                >                  <div
                    id="mc_embed_signup_scroll"
                    className="flex flex-col items-center justify-between w-full px-2 py-2 mt-8 bg-white shadow-xl rounded-xl md:flex-row"
                  >
                    <input
                      type="email"
                      name="EMAIL"
                      className="w-10/12 p-2 mx-4 text-base text-gray-900"
                      id="mce-EMAIL"
                      placeholder="Email Address"
                      required
                    />
                    <div
                      style={{ position: 'absolute', left: '-5000px' }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="b_5ce5e82d673fd2cfaf12849a5_e85a091ed3"
                        tabIndex={-1}
                      />
                    </div>
                    <div className="clear">
                      <input
                        type="submit"
                        value="Join Waitlist"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        className="px-4 py-2 mt-4 text-base font-medium text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-xl md:mt-0"
                        readOnly
                        onClick={(e) => toggleCtaModal(false)}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* DESKTOP + TABLET VERSION */}
      <div className="flex-col hidden w-full h-full lg:flex">
        <header className="w-full bg-primary">
          <Link href="https://launch.popcorn.network/" passHref>
            <a target="_window">
              <div className="flex justify-center w-full bg-yellow-500 shadow-md cursor-pointer h-14 hover:bg-yellow-400">
                <div className="flex flex-row items-center mx-auto">
                  <p className="text-2xl font-bold text-white">
                    Token Launch Auction
                  </p>
                  <Icon.ArrowRightCircle className="ml-2 text-white w-7 h-7" />
                </div>
              </div>
            </a>
          </Link>
          <nav className="flex flex-row items-center justify-between w-10/12 pt-12 pb-4 mx-auto border-b border-primaryLight">
            <div>
              <Link href="/" passHref>
                <a>
                  {/*TODO The logo is slightly blurred even though its copied straight from figma*/}
                  <img
                    src="/images/textLogo.png"
                    alt="Logo"
                    className="h-12"
                  ></img>
                </a>
              </Link>
            </div>
            <div className="space-x-8">
              <Link href="https://launch.popcorn.network/" passHref>
                <a className="text-base font-normal hover:text-blue-600">
                  Token Launch Auction
                </a>
              </Link>
              <Link href="/docs/Popcorn_whitepaper_v1.pdf" passHref>
                <a
                  className="text-base font-normal hover:text-blue-600"
                  target="_window"
                >
                  Whitepaper
                </a>
              </Link>
              <Link href="/team" passHref>
                <a className="text-base font-normal hover:text-blue-600">
                  Team & Contributors
                </a>
              </Link>
              <a
                className="p-4 text-base font-medium text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-xl"
                onClick={(e) => toggleCtaModal(true)}
              >
                Early Access
              </a>
            </div>
          </nav>
        </header>
        <section className="min-h-full">
          <div className="w-full h-8 bg-primary 2xl:h-28"></div>
          <div
            className="flex-grow-0 flex-shrink-0 w-full h-full bg-hero-pattern"
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex flex-col items-center justify-between w-10/12 pb-48 mx-auto min-w-480 lg:flex-row">
              <div className="order-2 w-full lg:w-6/12 xl:w-5/12 lg:order-1">
                <div className="w-10/12 mx-auto text-center lg:text-left lg:mx-0">
                  <h1 className="mb-3 font-bold leading-snug lg:text-5xl xl:text-7xl ">
                    Start doing good with DeFi
                  </h1>
                  <p className="text-xl font-landing">
                    Earn high yield on your cryptoassets while creating real
                    world impact. Our earnings fund social impact organizations.
                  </p>
                  <form
                    action="https://network.us1.list-manage.com/subscribe/post?u=5ce5e82d673fd2cfaf12849a5&amp;id=e85a091ed3"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_blank"
                    noValidate
                  >
                    <div
                      id="mc_embed_signup_scroll"
                      className="flex flex-row items-center justify-between w-full px-2 py-2 mt-4 bg-white shadow-xl rounded-xl"
                    >
                      <input
                        type="email"
                        name="EMAIL"
                        className="w-10/12 p-2 mx-4 text-base text-gray-900"
                        id="mce-EMAIL"
                        placeholder="Email Address"
                        required
                      />
                      <div
                        style={{ position: 'absolute', left: '-5000px' }}
                        aria-hidden="true"
                      >
                        <input
                          type="text"
                          name="b_5ce5e82d673fd2cfaf12849a5_e85a091ed3"
                          tabIndex={-1}
                        />
                      </div>
                      <div className="clear">
                        <input
                          type="submit"
                          value="Join Waitlist"
                          name="subscribe"
                          id="mc-embedded-subscribe"
                          className="px-4 py-2 text-base font-medium text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-xl"
                          readOnly
                        />
                      </div>
                    </div>
                  </form>

                  <div className="mt-4 w-fit-content">
                    <div className="py-2 mx-auto w-fit-content">
                      <h3 className="text-xl text-left font-landing w-fit-content">
                        Don’t miss the token launch auction!
                      </h3>
                      <div className="flex flex-row justify-between w-full pb-20 mx-auto mt-3">
                        <div className="text-center">
                          <h1 className="text-4xl font-medium leading-snug">
                            {countdown[0]}
                          </h1>
                          <p className="text-gray-500 text-5/12xl font-landing">
                            Days
                          </p>
                        </div>
                        <div className="text-center">
                          <h1 className="text-4xl font-medium leading-snug">
                            {countdown[1]}
                          </h1>
                          <p className="text-gray-500 text-5/12xl font-landing">
                            Hours
                          </p>
                        </div>
                        <div className="text-center">
                          <h1 className="text-4xl font-medium leading-snug">
                            {countdown[2]}
                          </h1>
                          <p className="text-gray-500 text-5/12xl font-landing">
                            Minutes
                          </p>
                        </div>
                        <div className="text-center">
                          <h1 className="text-4xl font-medium leading-snug">
                            {countdown[3]}
                          </h1>
                          <p className="text-gray-500 text-5/12xl font-landing">
                            Seconds
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 w-full mb-8 lg:w-6/12 xl:w-7/12 lg:order-2 lg:mb-0">
                <CatPool />
              </div>
            </div>
            <div className="w-full h-24"></div>
          </div>
        </section>
        <section className="w-10/12 mx-auto mb-24">
          <h2 className="mb-4 text-5xl font-bold xl:text-6xl">How it works</h2>
          <p className="text-xl text-gray-500 font-landing">
            Put your cryptoassets to work
          </p>
          <div className="flex flex-row flex-wrap justify-between w-full mt-16">
            <div className="flex-grow-0 flex-shrink-0 w-1/2 mb-12 xl:w-1/4 xl:mb-0">
              <div className="flex flex-col items-center w-11/12 shadow-2xl h-104 rounded-xl">
                <div className="flex items-center mt-12 rounded-full w-36 h-36 bg-primary">
                  <img
                    src="/images/metamaskCat.svg"
                    alt="metamaskCat"
                    className="mx-auto mb-1"
                  ></img>
                </div>
                <h3 className="py-8 text-4xl font-medium">Connect</h3>
                <p className="w-3/4 text-xl text-center text-gray-500">
                  Connect your Metamask wallet with Popcorn
                </p>
              </div>
            </div>
            <div className="flex-grow-0 flex-shrink-0 w-1/2 mb-12 xl:w-1/4 xl:mb-0">
              <div className="flex flex-col items-center w-11/12 shadow-2xl h-104 rounded-xl">
                <div className="flex items-center mt-12 rounded-full w-36 h-36 bg-primary">
                  <img
                    src="/images/vault.svg"
                    alt="vault"
                    className="mx-auto mb-2"
                  ></img>
                </div>
                <h3 className="py-8 text-4xl font-medium">Deposit</h3>
                <p className="w-3/4 text-xl text-center text-gray-500">
                  Deposit your crypto and choose a product or strategy
                </p>
              </div>
            </div>
            <div className="flex-grow-0 flex-shrink-0 w-1/2 xl:w-1/4">
              <div className="flex flex-col items-center w-11/12 shadow-2xl h-104 rounded-xl">
                <div className="flex items-center mt-12 rounded-full w-36 h-36 bg-primary">
                  <img
                    src="/images/popcornVault.svg"
                    alt="popcornVault"
                    className="mx-auto mt-2"
                  ></img>
                </div>
                <h3 className="py-8 text-4xl font-medium">Do well</h3>
                <p className="w-3/4 text-xl text-center text-gray-500">
                  Earn competitive returns on your crypto assets
                </p>
              </div>
            </div>
            <div className="flex-grow-0 flex-shrink-0 w-1/2 xl:w-1/4">
              <div className="flex flex-col items-center w-11/12 shadow-2xl h-104 rounded-xl">
                <div className="flex items-center mt-12 rounded-full w-36 h-36 bg-primary">
                  <img
                    src="/images/catMail.svg"
                    alt="catMail"
                    className="mx-auto mb-1"
                  ></img>
                </div>
                <h3 className="py-8 text-4xl font-medium">Do good</h3>
                <p className="w-3/4 text-xl text-center text-gray-500">
                  Choose which social impact organization you’d like to help
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="flex-grow-0 flex-shrink-0 w-full h-full bg-popcorn1-pattern xl:mb-24"
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto',
            backgroundPosition: 'left top',
          }}
        >
          <div className="flex flex-row items-center justify-between w-10/12 pt-20 mx-auto">
            <div className="w-5/12">
              <h2 className="w-11/12 mb-4 text-5xl font-bold leading-snug xl:text-6xl">
                Maximize your Crypto Portfolio
              </h2>
              <p className="text-2xl text-gray-500 font-landing">
                Popcorn offers a suite of DeFi products and hedge fund
                strategies for you to generate competitive returns on your
                crypto assets.
              </p>
              <img
                src="/images/bgPopcorn2.svg"
                alt="bgPopcorn2"
                className="mx-auto"
              ></img>
            </div>
            <div className="w-6/12">
              <Rocket />
            </div>
          </div>
        </section>
        <section className="flex-grow-0 flex-shrink-0 w-full h-full py-40 bg-impact-pattern xl:py-104 impact-background">
          <div className="flex flex-row items-center justify-between w-10/12 mx-auto">
            <div className="w-7/12 2xl:w-8/12"></div>
            <div className="w-5/12 2xl:w-4/12">
              <h2 className="mb-4 text-5xl font-bold leading-snug xl:text-6xl 2xl:w-9/12">
                Create Real World Impact
              </h2>
              <p className="text-2xl text-gray-500 font-landing 2xl:w-10/12">
                Our profits fund social impact organizations. Choose which
                initiatives you support:
              </p>
              <ul className="mt-8 space-y-3 list-disc list-inside">
                <li className="text-2xl font-medium font-landing">
                  Environment
                </li>
                <li className="text-2xl font-medium font-landing">
                  Open Source
                </li>
                <li className="text-2xl font-medium font-landing">Education</li>
              </ul>
            </div>
          </div>
        </section>
        <section
          className="flex-grow-0 flex-shrink-0 w-full h-full mb-24 bg-popcorn3-pattern"
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto',
            backgroundPosition: 'left top',
          }}
        >
          <div className="flex flex-row items-center justify-between w-10/12 pt-20 mx-auto">
            <div className="w-5/12">
              <h2 className="w-11/12 mb-4 text-5xl font-bold leading-snug xl:text-6xl">
                While Remaining Carbon Neutral
              </h2>
              <p className="text-2xl text-gray-500 font-landing">
                Popcorn calculates and neutralizes blockchain carbon emissions
                by partnering with carbon sequestration and negative emission
                projects.
              </p>
            </div>
            <div className="w-6/12">
              <img src="/images/tree.svg" alt="tree" className=""></img>
            </div>
          </div>
        </section>
        <section>
          <div
            className="flex-grow-0 flex-shrink-0 w-full h-full bg-countdown-pattern pt-60 xl:pt-72 2xl:pt-104"
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="pt-32">
              <div className="w-10/12 mx-auto bg-white shadow-xl rounded-xl">
                <h3 className="pt-20 pb-12 text-4xl font-medium text-center">
                  Don’t miss the token launch auction!
                </h3>
                <div className="flex flex-row justify-between w-9/12 pb-20 mx-auto">
                  <div className="text-center">
                    <h1 className="font-bold leading-snug text-7xl">
                      {countdown[0]}
                    </h1>
                    <p className="text-3xl text-gray-500 font-landing">Days</p>
                  </div>
                  <div className="text-center">
                    <h1 className="font-bold leading-snug text-7xl">
                      {countdown[1]}
                    </h1>
                    <p className="text-3xl text-gray-500 font-landing">Hours</p>
                  </div>
                  <div className="text-center">
                    <h1 className="font-bold leading-snug text-7xl">
                      {countdown[2]}
                    </h1>
                    <p className="text-3xl text-gray-500 font-landing">
                      Minutes
                    </p>
                  </div>
                  <div className="text-center">
                    <h1 className="font-bold leading-snug text-7xl">
                      {countdown[3]}
                    </h1>
                    <p className="text-3xl text-gray-500 font-landing">
                      Seconds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-secondary py-52">
          <div className="w-8/12 mx-auto text-center">
            <h2 className="mb-4 text-4xl font-bold leading-snug">Notify Me</h2>
            <p className="text-2xl font-medium">
              Can’t wait to see you when we are launching. Get earlier
              notification to be part of our journey
            </p>
            <form
              action="https://network.us1.list-manage.com/subscribe/post?u=5ce5e82d673fd2cfaf12849a5&amp;id=e85a091ed3"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
              noValidate
            >
              <div
                id="mc_embed_signup_scroll"
                className="flex flex-row items-center justify-between w-8/12 px-2 py-2 mx-auto mt-8 bg-white shadow-xl rounded-xl"
              >
                <input
                  type="email"
                  name="EMAIL"
                  className="w-10/12 p-2 mx-4 text-base text-gray-900"
                  id="mce-EMAIL"
                  placeholder="Email Address"
                  required
                />
                <div
                  style={{ position: 'absolute', left: '-5000px' }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="b_5ce5e82d673fd2cfaf12849a5_e85a091ed3"
                    tabIndex={-1}
                  />
                </div>
                <div className="clear">
                  <input
                    type="submit"
                    value="Join Waitlist"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="px-4 py-2 text-base font-medium text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-xl"
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </section>
        <section className="w-full bg-secondary">
          <div className="flex flex-row justify-between w-10/12 pb-12 mx-auto border-b border-gray-500">
            <div className="w-6/12">
              <Link href="/" passHref>
                <a>
                  <img src="/images/logo.png" alt="Logo" className="h-10"></img>
                </a>
              </Link>
              <p className="w-7/12 py-4 text-base font-medium">
                Popcorn is a carbon-neutral crypto savings account where fees
                fund educational, environmental and open source initiatives
              </p>
              <div className="flex flex-row items-center space-x-4">
                <Link href="https://github.com/popcorndao" passHref>
                  <GitHub className="cursor-pointer hover:text-blue-600" />
                </Link>
                <Link href="https://www.facebook.com/PopcornDAO" passHref>
                  <Facebook className="cursor-pointer hover:text-blue-600" />
                </Link>
                <Link href="https://twitter.com/Popcorn_DAO" passHref>
                  <Twitter className="cursor-pointer hover:text-blue-600" />
                </Link>
                <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                  <img
                    src="/images/discord.svg"
                    alt="discord"
                    className="w-8 h-8 cursor-pointer discord"
                  ></img>
                </Link>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-base font-medium uppercase">Site</p>
              <Link href="/" passHref>
                <a className="hover:text-blue-600">Home</a>
              </Link>

              <Link href="https://medium.com/popcorndao" passHref>
                <a className="hover:text-blue-600" target="_window">
                  Blog
                </a>
              </Link>
              <Link
                href="https://etherscan.io/token/0xd0cd466b34a24fcb2f87676278af2005ca8a78c4"
                passHref
              >
                <a className="hover:text-blue-600" target="_window">
                  Popcorn (POP) Token
                </a>
              </Link>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-base font-medium uppercase">Connect</p>
              <Link href="https://twitter.com/Popcorn_DAO" passHref>
                <a className="hover:text-blue-600" target="_window">
                  Twitter
                </a>
              </Link>
              <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                <a className="hover:text-blue-600" target="_window">
                  Discord
                </a>
              </Link>
              <Link href="https://github.com/popcorndao" passHref>
                <a className="hover:text-blue-600" target="_window">
                  Github
                </a>
              </Link>
            </div>
          </div>
          <p className="py-4 text-center font-base">
            ©2021, Popcorn Network. All Rights Reserved
          </p>
        </section>
      </div>
      {/* MOBILE VERSION */}
      <div className="w-full h-full lg:hidden">
        <Transition
          show={menuVisible}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <MobileExpandableMenu toggleMenuVisible={toggleMenu} />
        </Transition>

        <Transition
          show={!menuVisible}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            <header className="w-full bg-primary">
              <Link href="https://launch.popcorn.network/" passHref>
                <a target="_window">
                  <div className="flex justify-center w-full bg-yellow-500 shadow-md cursor-pointer h-14 hover:bg-yellow-400">
                    <div className="flex flex-row items-center mx-auto">
                      <p className="text-2xl font-bold text-white">
                        Token Launch Auction
                      </p>
                      <Icon.ArrowRightCircle className="ml-2 text-white w-7 h-7" />
                    </div>
                  </div>
                </a>
              </Link>
              <nav className="flex flex-row items-center justify-between w-10/12 pt-12 pb-3 mx-auto border-b border-primaryLight">
                <div>
                  <Link href="/" passHref>
                    <a>
                      {/*TODO The logo is slightly blurred even though its copied straight from figma*/}
                      <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="flex-grow-0 flex-shrink-0 h-14"
                      ></img>
                    </a>
                  </Link>
                </div>
                <div ref={node}>
                  <FocusLock disabled={!open}>
                    <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                    <Menu open={open} setOpen={setOpen} id={menuId} />
                  </FocusLock>
                </div>
              </nav>
            </header>
            <section className="min-h-full">
              <div className="w-full h-12 bg-primary"></div>
              <div
                className="flex-grow-0 flex-shrink-0 w-full h-full pt-6 bg-hero-pattern md:pt-10"
                style={{
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="flex flex-col items-center justify-between w-10/12 pb-16 mx-auto text-center lg:flex-row">
                  <CatPool />
                  <h1 className="mb-8 text-4xl font-bold leading-snug">
                    Start doing good with DeFi
                  </h1>
                  <p className="text-lg font-landing">
                    Earn high yield on your cryptoassets while creating real
                    world impact. Our earnings fund social impact organizations.
                  </p>
                  <form
                    action="https://network.us1.list-manage.com/subscribe/post?u=5ce5e82d673fd2cfaf12849a5&amp;id=e85a091ed3"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_blank"
                    noValidate
                  >
                    <div
                      id="mc_embed_signup_scroll"
                      className="flex flex-row items-center justify-between w-full px-2 py-2 mt-8 bg-white shadow-xl rounded-xl"
                    >
                      <input
                        type="email"
                        name="EMAIL"
                        className="w-10/12 p-2 mx-4 text-base text-gray-900"
                        id="mce-EMAIL"
                        placeholder="Email Address"
                        required
                      />
                      <div
                        style={{ position: 'absolute', left: '-5000px' }}
                        aria-hidden="true"
                      >
                        <input
                          type="text"
                          name="b_5ce5e82d673fd2cfaf12849a5_e85a091ed3"
                          tabIndex={-1}
                        />
                      </div>
                      <div className="clear">
                        <input
                          type="submit"
                          value="Join Waitlist"
                          name="subscribe"
                          id="mc-embedded-subscribe"
                          className="px-4 py-2 text-base font-medium text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-xl"
                          readOnly
                        />
                      </div>
                    </div>
                  </form>
                  <div className="w-full">
                    <div className="w-10/12 mx-auto">
                      <h3 className="pt-16 pb-12 text-2xl font-medium leading-8 text-center">
                        Don’t miss the token launch auction!
                      </h3>
                      <div className="w-9/12 mx-auto">
                        <div className="flex flex-row justify-between mb-8">
                          <div className="w-5/12 text-center">
                            <h1 className="text-4xl font-bold leading-snug">
                              {countdown[0]}
                            </h1>
                            <p className="text-1.5xl font-landing text-gray-500">
                              Days
                            </p>
                          </div>
                          <div className="w-5/12 text-center">
                            <h1 className="text-4xl font-bold leading-snug">
                              {countdown[1]}
                            </h1>
                            <p className="text-lg text-gray-500 font-landing">
                              Hours
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row justify-between">
                          <div className="w-5/12 text-center">
                            <h1 className="text-4xl font-bold leading-snug">
                              {countdown[2]}
                            </h1>
                            <p className="text-gray-500 text-1xl font-landing">
                              Minutes
                            </p>
                          </div>
                          <div className="w-5/12 text-center">
                            <h1 className="text-4xl font-bold leading-snug">
                              {countdown[3]}
                            </h1>
                            <p className="text-1.5xl font-landing text-gray-500">
                              Seconds
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="w-10/12 mx-auto mb-24">
              <h2 className="mb-4 text-3xl font-bold text-center">
                How it works
              </h2>
              <p className="text-lg text-center text-gray-500 font-landing">
                Put your cryptoassets to work
              </p>
              <div className="flex flex-col justify-between w-11/12 mx-auto mt-12 space-y-12">
                <div className="flex flex-col items-center flex-grow-0 flex-shrink-0 shadow-2xl md:h-96 rounded-xl">
                  <div className="flex items-center mt-12 rounded-full w-36 h-36 bg-primary">
                    <img
                      src="/images/metamaskCat.svg"
                      alt="metamaskCat"
                      className="mx-auto mb-1"
                    ></img>
                  </div>
                  <h3 className="py-4 pt-8 text-2xl font-medium">Connect</h3>
                  <p className="w-3/4 mb-16 text-lg text-center text-gray-500">
                    Connect your Metamask wallet with Popcorn
                  </p>
                </div>

                <div className="flex flex-col items-center flex-grow-0 flex-shrink-0 shadow-2xl md:h-96 rounded-xl">
                  <div className="flex items-center mt-12 rounded-full w-36 h-36 bg-primary">
                    <img
                      src="/images/vault.svg"
                      alt="vault"
                      className="mx-auto mb-2"
                    ></img>
                  </div>
                  <h3 className="py-4 pt-8 text-2xl font-medium">Deposit</h3>
                  <p className="w-3/4 mb-16 text-lg text-center text-gray-500">
                    Deposit your crypto and choose a product or strategy
                  </p>
                </div>
                <div className="flex flex-col items-center flex-grow-0 flex-shrink-0 shadow-2xl md:h-96 rounded-xl">
                  <div className="flex items-center mt-12 rounded-full w-36 h-36 bg-primary">
                    <img
                      src="/images/popcornVault.svg"
                      alt="popcornVault"
                      className="mx-auto mt-2"
                    ></img>
                  </div>
                  <h3 className="py-4 pt-8 text-2xl font-medium">Do well</h3>
                  <p className="w-3/4 mb-16 text-lg text-center text-gray-500">
                    Earn competitive returns on your crypto assets
                  </p>
                </div>

                <div className="flex flex-col items-center flex-grow-0 flex-shrink-0 shadow-2xl md:h-96 rounded-xl">
                  <div className="flex items-center mt-12 rounded-full w-36 h-36 bg-primary">
                    <img
                      src="/images/catMail.svg"
                      alt="catMail"
                      className="mx-auto mb-1"
                    ></img>
                  </div>
                  <h3 className="py-4 pt-8 text-2xl font-medium">Do good</h3>
                  <p className="w-3/4 mb-16 text-lg text-center text-gray-500">
                    Choose which social impact organization you’d like to help
                  </p>
                </div>
              </div>
            </section>
            <section className="w-10/12 h-full mx-auto">
              <Rocket />
              <h2 className="mt-12 mb-4 text-3xl font-bold leading-snug text-center">
                Maximize your Crypto Portfolio
              </h2>
              <p className="text-lg text-center text-gray-500 font-landing">
                Popcorn offers a suite of DeFi products and hedge fund
                strategies for you to generate competitive returns on your
                crypto assets.
              </p>
            </section>
            <section className="w-10/12 h-full mx-auto mt-24">
              <img src="/images/impact.svg" alt="impact" className=""></img>
              <h2 className="w-10/12 mx-auto mt-8 mb-4 text-3xl font-bold leading-snug text-center">
                Create Real World Impact
              </h2>
              <p className="text-lg text-center text-gray-500 font-landing">
                Our profits fund social impact organizations. Choose which
                initiatives you support:
              </p>
              <div className="w-1/2 mx-auto">
                <ul className="mt-8 space-y-2 list-disc list-inside">
                  <li className="text-lg font-medium">Environment</li>
                  <li className="text-lg font-medium">Open Source</li>
                  <li className="text-lg font-medium">Education</li>
                </ul>
              </div>
            </section>
            <section className="w-10/12 h-full mx-auto mt-24">
              <img src="/images/tree.svg" alt="tree" className=""></img>
              <h2 className="w-10/12 mx-auto mt-8 mb-4 text-3xl font-bold leading-snug text-center">
                While Remaining Carbon Neutral
              </h2>
              <p className="text-lg text-center text-gray-500 font-landing">
                Popcorn calculates and neutralizes blockchain carbon emissions
                by partnering with carbon sequestration and negative emission
                projects.
              </p>
            </section>

            <section>
              <div
                className="flex-grow-0 flex-shrink-0 w-full h-full bg-countdown-pattern pt-60"
                style={{
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="w-full pt-32">
                  <div className="w-10/12 mx-auto bg-white shadow-xl rounded-xl">
                    <h3 className="pt-20 pb-12 text-4xl font-medium text-center">
                      Don’t miss the token launch auction!
                    </h3>
                    <div className="w-9/12 pb-20 mx-auto">
                      <div className="flex flex-row justify-between mb-8">
                        <div className="w-5/12 text-center">
                          <h1 className="font-bold leading-snug text-7xl">
                            {countdown[0]}
                          </h1>
                          <p className="text-3xl text-gray-500 font-landing">
                            Days
                          </p>
                        </div>
                        <div className="w-5/12 text-center">
                          <h1 className="font-bold leading-snug text-7xl">
                            {countdown[1]}
                          </h1>
                          <p className="text-3xl text-gray-500 font-landing">
                            Hours
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between">
                        <div className="w-5/12 text-center">
                          <h1 className="font-bold leading-snug text-7xl">
                            {countdown[2]}
                          </h1>
                          <p className="text-3xl text-gray-500 font-landing">
                            Minutes
                          </p>
                        </div>
                        <div className="w-5/12 text-center">
                          <h1 className="font-bold leading-snug text-7xl">
                            {countdown[3]}
                          </h1>
                          <p className="text-3xl text-gray-500 font-landing">
                            Seconds
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="w-full py-24 bg-secondary">
              <div className="w-10/12 mx-auto text-center">
                <h2 className="mb-4 text-2xl font-bold leading-snug">
                  Notify Me
                </h2>
                <p className="text-lg">
                  Can’t wait to see you when we are launching. Get earlier
                  notification to be part of our journey
                </p>
                <form
                  action="https://network.us1.list-manage.com/subscribe/post?u=5ce5e82d673fd2cfaf12849a5&amp;id=e85a091ed3"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate"
                  target="_blank"
                  noValidate
                >
                  <div
                    id="mc_embed_signup_scroll"
                    className="flex flex-row items-center justify-between w-full px-2 py-2 mx-auto mt-8 bg-white shadow-xl rounded-xl"
                  >
                    <input
                      type="email"
                      name="EMAIL"
                      className="w-10/12 p-2 mx-4 text-base text-gray-900"
                      id="mce-EMAIL"
                      placeholder="Email Address"
                      required
                    />
                    <div
                      style={{ position: 'absolute', left: '-5000px' }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="b_5ce5e82d673fd2cfaf12849a5_e85a091ed3"
                        tabIndex={-1}
                      />
                    </div>
                    <div className="clear">
                      <input
                        type="submit"
                        value="Join Waitlist"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        className="px-4 py-2 text-base font-medium text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-xl"
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
            </section>
            <section className="w-full bg-secondary">
              <div className="w-10/12 mx-auto">
                <Link href="/" passHref>
                  <a>
                    {/*TODO The logo is slightly blurred even though its copied straight from figma*/}
                    <img
                      src="/images/logo.png"
                      alt="Logo"
                      className="flex-grow-0 flex-shrink-0 h-10"
                    ></img>
                  </a>
                </Link>
                <p className="py-4 text-base font-medium">
                  Popcorn is a new eco-friendly paradigm for DeFi, where users
                  can earn high yield on their crypto assets while creating real
                  world impact.
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <Link href="https://github.com/popcorndao" passHref>
                    <GitHub className="cursor-pointer hover:text-blue-600" />
                  </Link>
                  <Link href="https://www.facebook.com/PopcornDAO" passHref>
                    <Facebook className="cursor-pointer hover:text-blue-600" />
                  </Link>
                  <Link href="https://twitter.com/Popcorn_DAO" passHref>
                    <Twitter className="cursor-pointer hover:text-blue-600" />
                  </Link>
                  <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                    <img
                      src="/images/discord.svg"
                      alt="discord"
                      className="w-8 h-8 cursor-pointer discord"
                    ></img>
                  </Link>
                </div>
                <div className="flex flex-row py-6 justify-evenly">
                  <div className="flex flex-col w-1/2 space-y-3">
                    <p className="text-base font-medium uppercase">Site</p>
                    <Link href="/" passHref>
                      <a className="hover:text-blue-600">Home</a>
                    </Link>
                    <Link href="https://medium.com/popcorndao" passHref>
                      <a className="hover:text-blue-600" target="_window">
                        Blog
                      </a>
                    </Link>
                    <Link
                      href="https://etherscan.io/token/0xd0cd466b34a24fcb2f87676278af2005ca8a78c4"
                      passHref
                    >
                      <a className="hover:text-blue-600" target="_window">
                        Popcorn (POP) Token
                      </a>
                    </Link>
                    <Link href="https://launch.popcorn.network/" passHref>
                      <a className="hover:text-blue-600" target="_window">
                        Token Launch Auction
                      </a>
                    </Link>
                  </div>
                  <div className="flex flex-col w-1/2 space-y-3">
                    <p className="text-base font-medium uppercase">Connect</p>
                    <Link href="https://twitter.com/Popcorn_DAO" passHref>
                      <a className="hover:text-blue-600" target="_window">
                        Twitter
                      </a>
                    </Link>
                    <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                      <a className="hover:text-blue-600" target="_window">
                        Discord
                      </a>
                    </Link>
                    <Link href="https://github.com/popcorndao" passHref>
                      <a className="hover:text-blue-600" target="_window">
                        Github
                      </a>
                    </Link>
                  </div>
                </div>
                {/*<div className="flex flex-col space-y-3">
            <p className="text-base font-medium uppercase">Documentation</p>
            <Link href="/" passHref>
              <a className="hover:text-blue-600">Gitbook</a>
            </Link>
          </div>*/}
              </div>
              <div className="w-10/12 mx-auto mt-12 border-t border-gray-700 ">
                <p className="py-4 text-center font-base">
                  ©2021, Popcorn Network. All Rights Reserved
                </p>
              </div>
            </section>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default IndexPage;
