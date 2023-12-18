"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession(); //this is to check if the user is logged in or not

  const [providers, setProviders] = useState(null);

  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Logo"
          height={37}
          width={37}
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* {alert(providers)} */}
      {/* Desktop Navigation  */}
      <div className="sm:flex hidden">
        {" "}
        {/*this is to hid the log in if the screen size is small*/}
        {session?.user ? (
          //this is if user is logged in then it will show the following buttons and links
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              {/*this creates a button linked to create post*/}
              Create Post{" "}
            </Link>
            <button onClick={signOut} className="outline_btn">
              {/*this is a button to Sign out as user is logged in*/}
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          //if the user is not logged in then it will show an button to signIn
          //using next-auth by using providers
          <>
            {/*this is sign In button using next-auth and providers  */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation  */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            {" "}
            <Image
              src={session?.user.image}
              alt="Logo"
              height={37}
              width={37}
              onClick={() => setToggleDropDown((prev) => !prev)} //this changes the state so the logo will shopw a dropDown menu
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)} //this sets the state of logo to false so the dropdown menu cloese itself
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/*this is sign In button using next-auth and providers  */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
