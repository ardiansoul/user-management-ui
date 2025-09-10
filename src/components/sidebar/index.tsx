import menus from "../../constants/menus";

export default function Sidebar() {
  return (
    <div>
      {menus.map((menu, index) => (
        <div key={index}>
          <i className={`icon-${menu.icon}`}></i>
          <span>{menu.label}</span>
        </div>
      ))}
    </div>
  );
}
