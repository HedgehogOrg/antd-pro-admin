import ChartsArea from '../components/ChartsArea';
import { observer } from 'mobx-react';
import user from '@/stores/user';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      dashboard
      user: {JSON.stringify(user.user)}
      <Link to={'/404'}>404</Link>
      <ChartsArea></ChartsArea>
    </div>
  );
};

export default observer(Dashboard);
