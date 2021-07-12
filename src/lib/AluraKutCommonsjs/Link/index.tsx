import { FunctionComponent, ReactNode } from 'react';
import NextLink from 'next/link';

type LinkProps = {
  href: string;
  children: ReactNode;
};

const Link: FunctionComponent<LinkProps> = ({ href, children, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

export { Link };
