import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const IconText = ({ iconName, displayText, active, targetLink, onClick }) => {
  const content = (
    <div
      className="flex items-center justify-start cursor-pointer"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
    >
      <div className="px-5 py-2">
        <Icon
          icon={iconName}
          color={active ? "white" : "gray"}
          fontSize={27}
        />
      </div>
      <div
        className={`${
          active ? "text-white" : "text-gray-400"
        } text-sm font-semibold hover:text-white`}
      >
        {displayText}
      </div>
    </div>
  );

  if (targetLink) {
    return <Link to={targetLink} className="block">{content}</Link>;
  }

  return content;
};

export default IconText;