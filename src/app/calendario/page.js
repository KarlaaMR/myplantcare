import CalendarioSiembra from "../../components/CalendarioSiembra";
import { plantas } from "../../data/plantas";

export default function Calendario() {
  return (
    <div className="p-6">
      <CalendarioSiembra plantas={plantas} />
    </div>
  );
}