import { URLS } from "@/utils/URLS";
import { cn } from "@/utils/styles";
import { useRouter } from "next/navigation";
import React from "react";
interface LogoProps extends React.HTMLAttributes<HTMLHeadElement> { }
const Logo = ({ className, ...rest }: LogoProps) => {
  const router = useRouter()

  return (
    <img onClick={() => {
      router.push(URLS.HOME)
    }} src="/logo.png" className={cn('w-20 h-20 object-contain cursor-pointer', className)} />
  );
};

export default Logo;
