import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ChartsArea from '../components/ChartsArea';
import user from '@/stores/auth/UserStore';

function Dashboard() {
  return (
    <div>
      dashboard
      user:
      {' '}
      {JSON.stringify(user.user)}
      <Link to="/404">404</Link>
      <ChartsArea />
    </div>
  );
}

export default observer(Dashboard);
