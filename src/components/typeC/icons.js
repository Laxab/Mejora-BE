import React from 'react';
import { MdDashboard, MdAssessment, MdInventory, MdAccountCircle, MdAdminPanelSettings } from 'react-icons/md';
import { LuSettings } from 'react-icons/lu';
import { FaBusinessTime } from 'react-icons/fa';
import { RiBillFill, RiBook2Fill, RiMoneyPoundCircleFill, RiMoneyDollarCircleFill } from 'react-icons/ri';
import { BsFillPeopleFill } from "react-icons/bs";
import { IoIosPeople, IoIosChatbubbles, IoMdSettings, IoIosSpeedometer } from "react-icons/io";
import { PiShareNetworkFill } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";



const icons = {
  other: <MdDashboard />,
  TbReportSearch: <TbReportSearch />,
  MdDashboard: <MdDashboard />,
  LuSettings: <LuSettings />,
  MdAccountCircle: <MdAccountCircle />,
  FaBusinessTime: <FaBusinessTime />,
  RiBillFill: <RiBillFill />,
  RiBook2Fill: <RiBook2Fill />,
  RiMoneyPoundCircleFill: <RiMoneyPoundCircleFill />,
  RiMoneyDollarCircleFill: <RiMoneyDollarCircleFill />,
  MdAssessment: <MdAssessment />,
  MdAdminPanelSettings: <MdAdminPanelSettings />,
  BsFillPeopleFill: <BsFillPeopleFill />,
  IoIosPeople: <IoIosPeople />,
  IoIosChatbubbles: <IoIosChatbubbles />,
  IoMdSettings: <IoMdSettings />,
  IoIosSpeedometer: <IoIosSpeedometer />,
  PiShareNetworkFill: <PiShareNetworkFill />
};

export const icon = (data) => icons[data] || <MdInventory />;
