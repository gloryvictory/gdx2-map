// import {useMap} from 'react-map-gl/maplibre';
import { FloatButton } from 'antd';
import { TableOutlined } from '@ant-design/icons';
import useAppStore from '../../store/useAppstore';



export default function ButtonTable() {
  const   isTableInfoChecked = useAppStore((state) => state.isTableInfoChecked);
  const   toggleTableInfoChecked  = useAppStore((state) => state.toggleTableInfoChecked);
  // const { mymap } = useMap();
  // useEffect(() => {
  // }, []); 
    // const [open, setOpen] = useState(true);
  
  const onClick = () => {
    toggleTableInfoChecked()
    // console.log(isTableInfoChecked)
  }
    // mymap?.flyTo({center: [-122.4, 37.8]});
  

    return (
    <>
      <FloatButton  
        onClick={onClick} 
        icon={<TableOutlined />}  
        tooltip={<div>Таблица</div>} 
        type={isTableInfoChecked ? 'primary' : 'default'}
      />
    </>    
        
    )
    
    
}

// style={{ bottom: 100, right: 24 }}
