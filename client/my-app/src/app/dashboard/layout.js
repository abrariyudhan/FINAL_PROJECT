import NavbarWrapper from "@/components/NavbarWrapper";
import { div } from "three/src/nodes/math/OperatorNode";

export default function RootLayout({ children }) {
  return (
    <>
      <NavbarWrapper />
      <div className="h-16" />
        {children}
    </>
  )
}