import CircleChart from "./CircleChart";
import GraphChart from "./GraphChart";
import Statistics from "./Statistics";

export default function Dashbord() {
    return (
        <reactFragment>
 <div className="content" style={{background:'#14141403'}}>
<Statistics/> 
<GraphChart/> 
<CircleChart/> 
 </div>
        </reactFragment>
    )
}