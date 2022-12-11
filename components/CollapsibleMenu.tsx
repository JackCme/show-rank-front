import { useState } from 'react';
import { Collapse } from 'react-daisyui';
interface CollapsibleMenuProps {
  children?: React.ReactNode; // best, accepts everything React can render
  title?: string | React.ReactNode;
  extra?: string | React.ReactNode;
}
export default function CollapsibleMenu({
  extra,
  title,
  children,
}: CollapsibleMenuProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleToggle = () => {
    console.log('toggled!');
    setIsOpen(!isOpen);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-start gap-0 menu">
      <Collapse icon="arrow" className="w-full" open={isOpen}>
        <li className="flex flex-col" onClick={handleToggle}>
          {/* <Collapse.Title className="min-h-0 py-0 pl-0">{title}</Collapse.Title> */}
          <Collapse.Title className="min-h-0">{title}</Collapse.Title>
        </li>
        <Collapse.Content className="">{children}</Collapse.Content>
      </Collapse>
    </div>
  );
}
