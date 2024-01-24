import {useMap} from 'react-map-gl/maplibre';
import { FloatButton } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import useAppStore from '../../store/useAppstore';


export default function MyButton() {
    const { mymap } = useMap();
    const   isTableInfoChecked = useAppStore((state) => state.isTableInfoChecked);
    const   toggleTableInfoChecked  = useAppStore((state) => state.toggleTableInfoChecked);
  
    // console.log(`mymap: ${mymap}`)
    const onClick = () => {
      console.log(`mymap when click: ${mymap}`)    
      // mymap?.flyTo({center: [-122.4, 37.8]});
      if (isTableInfoChecked){ toggleTableInfoChecked()}
    };
    return (
    <>
      <FloatButton  onClick={onClick} icon={<QuestionCircleOutlined />}  tooltip={<div>Info</div>}/>
    </>    
        
    )
    
    
}

// style={{ right: 24 }}
