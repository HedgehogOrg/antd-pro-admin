import { useEffect, useState, useMemo } from 'react';
import {
  Radio, List, Skeleton, Spin,
} from 'antd';
import { MailOutlined, LoadingOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoticeItem from './NoticeItem';
import { NoticeItemType } from './type';
import { NoticeTypesEnum, NoticeStatusEnum } from './enum';
import NoticeFetch from '@/apis/NoticeFetch';
// import Config from '@/config/config';
// import { Platform } from '@/enums';
import { useUser } from '@/hooks';
import NoticeStore from '@/stores/notice';
import styles from './notice-list.module.less';

interface ComponentProps {
  type: NoticeTypesEnum;
}

const SCROLL_CONTAINER_HEIGHT = document.documentElement.clientHeight - 170;
const PAGE_SIZE = 10;

function NoticeList(props: ComponentProps) {
  const { type } = props;
  const localUser = useUser();
  const { id: accountId, organizationId } = localUser;
  const [mounted, setMounted] = useState<boolean>(false);
  // 加载状态
  const [loading, setLoading] = useState<boolean>(false);
  // 分页
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  // list
  const [listType, setListType] = useState<NoticeStatusEnum>(NoticeStatusEnum.ALL);
  const [list, setList] = useState<NoticeItemType[]>([]);
  const readList = useMemo(() => list.filter((item) => item.status === NoticeStatusEnum.READ), [list]);
  const unreadList = useMemo(() => list.filter((item) => item.status === NoticeStatusEnum.UNREAD), [list]);
  const dataSource = useMemo(() => {
    switch (listType) {
      case NoticeStatusEnum.ALL:
        return list;
      case NoticeStatusEnum.READ:
        return readList;
      case NoticeStatusEnum.UNREAD:
        return unreadList;
      default:
        return [];
    }
  }, [listType, list, readList, unreadList]);

  const loadMoreData = () => {
    const currentPage = page + 1;
    const params = {
      organizationId,
      accountId,
      page: currentPage,
      pageSize: PAGE_SIZE,
      kind: type,
      sort: '-createdAt',
    };

    setLoading(true);

    NoticeFetch.list(params).then((res) => {
      setList([...list, ...res.items]);
      setPage(currentPage);
      setTotal(res.total);
    }).finally(() => {
      setLoading(false);
    });
  };

  const onReadAll = () => {
    const unreadNotices = list.filter((item) => item.status === NoticeStatusEnum.UNREAD);

    if (!unreadNotices.length) return;

    NoticeFetch.readAll({ kind: type }).then(() => {
      const newList = list.map((item) => ({ ...item, status: 1 }));

      setList(newList);
      NoticeStore.fetchNoticeData();
    }).catch((err) => {
      console.log(err);
    });
  };

  const onReadNoticeItem = (id: number) => {
    let newList = [...list];
    newList = newList.map((item, i) => {
      if (item.id === id) {
        newList[i].status = 1;
      }

      return item;
    });

    if (mounted) {
      setList(newList);
    }
  };

  const onDeleteNoticeItem = (id: number) => {
    const newList = list.filter((item) => item.id !== id);

    if (mounted) {
      setList(newList);
      setTotal(total - 1);
    }
  };

  useEffect(() => {
    // 暂时禁用云医消息通知
    // if (Config.PLATFORM === Platform.ORGANIZATION) {
    loadMoreData();
    // }
  }, []);

  useEffect(() => {
    setMounted(true);

    return () => { setMounted(false); };
  }, []);

  return (
    <div className={styles['notice-list']}>
      <div className={styles['notice-list-header']}>
        <Radio.Group value={listType} onChange={(e) => { setListType(e.target.value); }}>
          <Radio.Button value={NoticeStatusEnum.ALL}>全部</Radio.Button>
          <Radio.Button value={NoticeStatusEnum.READ}>已读</Radio.Button>
          <Radio.Button value={NoticeStatusEnum.UNREAD}>未读</Radio.Button>
        </Radio.Group>

        <span className={styles['notice-list-header-readall']} onClick={onReadAll}>
          <MailOutlined />
          <span style={{ marginLeft: '4px' }}>全部标为已读</span>
        </span>
      </div>

      <div
        id={`scrollableNoticeDiv${type}`}
        style={{
          height: SCROLL_CONTAINER_HEIGHT,
          overflow: 'auto',
          padding: '0',
        }}
      >
        {
          (page === 0 && loading) ? <Skeleton active paragraph={{ rows: 8 }} style={{ padding: '0 16px' }} /> : (
            <InfiniteScroll
              scrollThreshold={0.99}
              dataLength={dataSource.length}
              next={loadMoreData}
              hasMore={list.length < total}
              loader={(
                dataSource.length > PAGE_SIZE ? (
                  <div style={{ padding: '16px 0', textAlign: 'center' }}>
                    <Spin indicator={<LoadingOutlined />} tip="加载中..." />
                  </div>
                ) : null
              )}
              endMessage={
                (dataSource.length > 0 && list.length >= total && page > 1)
                  ? <div style={{ margin: '24px 0', textAlign: 'center', color: '#999' }}>没有更多了～</div>
                  : null
              }
              scrollableTarget={`scrollableNoticeDiv${type}`}
            >
              <List
                dataSource={dataSource}
                renderItem={(item) => (
                  <NoticeItem
                    key={item.id}
                    item={item}
                    onRead={onReadNoticeItem}
                    onDelete={onDeleteNoticeItem}
                  />
                )}
              />
            </InfiniteScroll>
          )
        }
      </div>

      <div className={styles['notice-list-footer']}>
        共
        {dataSource.length}
        条消息
      </div>
    </div>
  );
}

export default NoticeList;
