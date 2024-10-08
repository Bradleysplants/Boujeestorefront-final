"use client";

import { Popover, Transition } from "@headlessui/react";
import { ArrowRightMini, XMark } from "@medusajs/icons";
import { Region } from "@medusajs/medusa";
import { Text, clx, useToggleState } from "@medusajs/ui";
import { Fragment } from "react";

import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CountrySelect from "../country-select";

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
};

const SideMenu = ({ regions, className }: { regions: Region[] | null; className?: string }) => {
  const toggleState = useToggleState();

  return (
    <div className={`h-full ${className}`}>
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button 
                  data-testid="nav-menu-button" 
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none text-2xl text-pastel-pink hover:text-primary-green underline"
                  aria-label="Menu"
                >
                  Menu
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-pastel-pink m-2 backdrop-blur-2xl" 
                  aria-label="Navigation menu"
                >
                  <div data-testid="nav-menu-popup" className="flex flex-col h-full bg-[rgba(3,7,18,0.5)] rounded-lg justify-between p-6">
                    <div className="flex justify-end" id="xmark">
                      <button 
                        data-testid="close-menu-button" 
                        onClick={close}
                        aria-label="Close navigation menu"
                        className="text-pastel-pink hover:text-primary-green"
                      >
                        <XMark aria-hidden="true" />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-6 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => (
                        <li key={name}>
                          <LocalizedClientLink
                            href={href}
                            className="text-3xl leading-10 text-pastel-pink hover:text-primary-green underline"
                            onClick={close}
                            data-testid={`${name.toLowerCase()}-link`}
                            aria-label={`Navigate to ${name}`}
                          >
                            {name}
                          </LocalizedClientLink>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                            // Removed className prop
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150 text-pastel-pink",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small text-pastel-pink">
                        © {new Date().getFullYear()} Delisa&apos;s Boujee Botanical Store. All rights reserved.
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default SideMenu;
