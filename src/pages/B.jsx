import { SignInButton, SignUpButton } from '@clerk/clerk-react';

export  function Index() {
  return (
    <>
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <a className="mr-auto" href="#">
          <span className=" text-[30px] font-bold text-black">Squid</span>
        </a>
        <div className="ml-auto">
          <div className="bg-messageColor text-white px-5 py-2 rounded-md">
            <SignInButton />
          </div>
        </div>
      </header>
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container flex flex-col gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tighter md:text-5xl lg:text-6xl -mt-2">
              Welcome to Squid: The Ultimate Platform for Developer Collaboration
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed">
              Empower Your Development Journey with Seamless Teamwork and Communication.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-3">
            <div className="bg-messageColor text-white px-5 py-2 rounded-md">
              <SignUpButton />
            </div>
            {/* </a> */}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By clicking Sign Up, you agree to our{' '}
              <a className="underline underline-offset-2" href="#">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a className="underline underline-offset-2" href="#">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </section>
      <footer className="bg-gray-100 absolute bottom-0 w-full p-1">
        <a href="https://github.com/Cyberverse2">
          <p className="text-center">Built By Ejiofor Celestine</p>
        </a>
      </footer>
    </>
  );
}
