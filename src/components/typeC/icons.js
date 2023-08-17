import React from 'react';
import { MdDashboard, MdOutlineInventory, MdInventory, MdAccountCircle, MdDiscount, MdAdminPanelSettings } from 'react-icons/md';
import { LuSettings } from 'react-icons/lu';
import { FaBusinessTime } from 'react-icons/fa';
import { RiBillFill } from 'react-icons/ri';

export const icon = (data) => {
  switch (data) {
    case "Dashboard":
      return <MdDashboard />;
    case "Inventory":
      return <MdOutlineInventory />;
    case "Settings":
      return <LuSettings />;
    case "Account":
      return <MdAccountCircle />;
    case "Business":
      return <FaBusinessTime />;
    case "Orders":
      return <RiBillFill />;
    case "Discounts":
      return <MdDiscount />;
    case "Super User":
      return <MdAdminPanelSettings />;
    default:
      return <MdInventory />;
  }
};
