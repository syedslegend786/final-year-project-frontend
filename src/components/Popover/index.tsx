import { Popover, Transition } from "@headlessui/react";
import { usePopper } from "react-popper";
import React, { Fragment, useState } from "react";
type PopoverProps = {
  children: React.ReactNode;
  pannel: React.ReactNode;
};
export default function PopOver({ children, pannel }: PopoverProps) {
  let [referenceElement, setReferenceElement] = useState<any>();
  let [popperElement, setPopperElement] = useState<any>();
  let { styles, attributes } = usePopper(referenceElement, popperElement);
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button ref={setReferenceElement}>{children}</Popover.Button>{" "}
          <Popover.Overlay className="fixed inset-0 overflow-hidden" />
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={"w-20 h-20 bg-black"}
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              {pannel}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
