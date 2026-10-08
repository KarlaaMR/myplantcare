import {plantas} from "../../data/plantas";
import Catalogo from "../../components/Catalogo";

export default function book() {
  return (
    <div>
      <Catalogo plantas={plantas} />
    </div>
  )
  
}