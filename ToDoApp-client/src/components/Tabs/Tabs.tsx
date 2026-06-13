interface TabsProps {
  activeTab: "todo" | "done";
  onChange: (tab: "todo" | "done") => void;
}

function Tabs({ activeTab, onChange }: TabsProps) {
  return (
    <div className="tabs">
      <button
        className={activeTab === "todo" ? "tab active" : "tab"}
        onClick={() => onChange("todo")}
      >
        To Do
      </button>

      <button
        className={activeTab === "done" ? "tab active" : "tab"}
        onClick={() => onChange("done")}
      >
        Done
      </button>
    </div>
  );
}
export default Tabs;
