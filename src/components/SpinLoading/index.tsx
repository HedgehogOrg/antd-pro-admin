import Spin from 'antd/es/spin';
import { ReactNode } from 'react';

function SpinLoading(props: { tip: null | string | ReactNode }) {
  const { tip } = props;

  // 父元素设置position：relative
  const containerStyle = {
    position: 'absolute' as const,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return <div style={containerStyle}><Spin tip={tip || ''} /></div>;
}

export default SpinLoading;
