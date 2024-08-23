"use client";

import { Customer } from "@medusajs/medusa";
import { clx } from "@medusajs/ui";
import { ArrowRightOnRectangle } from "@medusajs/icons";
import { useParams, usePathname } from "next/navigation";

import ChevronDown from "@modules/common/icons/chevron-down";
import { signOut } from "@modules/account/actions";
import User from "@modules/common/icons/user";
import MapPin from "@modules/common/icons/map-pin";
import Package from "@modules/common/icons/package";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const AccountNav = ({
  customer,
  className, // Accepting the className prop
}: {
  customer: Omit<Customer, "password_hash"> | null;
  className?: string; // Making className an optional prop
}) => {
  const route = usePathname();
  const { countryCode } = useParams() as { countryCode: string };

  const handleLogout = async () => {
    await signOut(countryCode);
  };

  return (
    <div className={clx(className)}>
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-2 text-small-regular py-2 text-pastel-pink hover:text-white"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-xl-semi mb-4 px-8 text-pastel-pink">
              Hello {customer?.first_name}
            </div>
            <div className="text-base-regular text-pastel-pink">
              <ul>
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between py-4 border-b border-darker-slate-gray px-8 hover:text-white"
                    data-testid="profile-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <User size={20} />
                        <span>Profile</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between py-4 border-b border-darker-slate-gray px-8 hover:text-white"
                    data-testid="addresses-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPin size={20} />
                        <span>Addresses</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between py-4 border-b border-darker-slate-gray px-8 hover:text-white"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />
                      <span>Orders</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 border-b border-darker-slate-gray px-8 w-full text-pastel-pink hover:text-white"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>Log out</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden small:block" data-testid="account-nav">
        <div>
          <div className="pb-4">
            <h3 className="text-base-semi text-pastel-pink">Account</h3>
          </div>
          <div className="text-base-regular">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li>
                <AccountNavLink
                  href="/account"
                  route={route!}
                  data-testid="overview-link"
                >
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/profile"
                  route={route!}
                  data-testid="profile-link"
                >
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/addresses"
                  route={route!}
                  data-testid="addresses-link"
                >
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/orders"
                  route={route!}
                  data-testid="orders-link"
                >
                  Orders
                </AccountNavLink>
              </li>
              <li className="text-pastel-pink">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="hover:text-white"
                  data-testid="logout-button"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

type AccountNavLinkProps = {
  href: string;
  route: string;
  children: React.ReactNode;
  "data-testid"?: string;
};

const AccountNavLink = ({
  href,
  route,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams();

  const active = route.split(countryCode)[1] === href;
  return (
    <LocalizedClientLink
      href={href}
      className={clx(
        "text-pastel-pink hover:text-white",
        {
          "font-semibold": active,
        }
      )}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  );
};

export default AccountNav;
