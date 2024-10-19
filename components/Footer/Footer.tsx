import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-black py-4 h-32 flex flex-col gap-6 justify-between items-center text-white">
      {
        <ul className="flex gap-14 w-fit m-auto">
          <Link href={'https://github.com/e-for-eshaan/'} target="_blank">
            <li className="hover:text-tone-1 tranform duration-200 text-white cursor-pointer">
              Github
            </li>
          </Link>
          <Link href={'https://twitter.com/e_for_eshaan'} target="_blank">
            <li className="hover:text-tone-2 tranform duration-200 text-white cursor-pointer">
              Twitter
            </li>
          </Link>
          <Link href={'https://linkedin.com/in/e-for-eshaan'} target="_blank">
            <li className="hover:text-tone-1 tranform duration-200 text-white cursor-pointer">
              LinkedIn
            </li>
          </Link>
        </ul>
      }
      © Eshaan 2024
    </footer>
  );
};
