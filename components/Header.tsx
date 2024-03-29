import Image from "next/image";
import Link from "next/link";
import 'boxicons/css/boxicons.min.css'

export default function Header({
  photo,
  email,
}: {
  photo?: string;
  email?: string;
}): JSX.Element {
  return (
    <header className="flex flex-col xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 gap-2">
      <Link href="/dream" className="flex space-x-2">
        {/* <Image
          alt="header text"
          src="/bed.svg"
          className="sm:w-10 sm:h-10 w-9 h-9"
          width={24}
          height={24}
        /> */}
        <div className="flex justify-center items-center">
        <i className='bx bxs-magic-wand bx-sm'></i>
        <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight">
          Insta Decor
        </h1>
        </div>
      </Link>
      {email ? (
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-blue-400 transition"
          >
            {/* <div>Dashboard</div> */}
          </Link>
          <Link
            href="/buy-credits"
            className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-blue-400 transition"
          >
            <div>Buy Credits</div>
            <div className="hidden">
              <div className="text-blue-500 bg-blue-200 rounded-full px-2 text-xs flex justify-center items-center font-bold">
                New
              </div>
            </div>
          </Link>
          {photo ? (
            <Image
              alt="Profile picture"
              src={photo}
              className="w-10 rounded-full"
              width={32}
              height={28}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white" />
          )}
        </div>
      ) : (
        <Link
          className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-400 bg-blue-600 font-medium transition"
          href="/dream"
        >
          <p>Sign Up </p>
        </Link>
      )}
    </header>
  );
}
