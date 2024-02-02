import { ReactNode } from "react";


const Watches = ({ children }: { children: ReactNode}) => {
  return (
    <div className="watches">
      {children}
    </div>
  )
}

export default Watches;