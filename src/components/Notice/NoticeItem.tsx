import React, { useEffect, useRef } from 'react';
import { Badge } from 'antd';
import { MailOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { NoticeItemType } from './type';
import { renderDateTime } from './helper';
import NoticeFetch from '@/apis/NoticeFetch';
import { BizTypesEnum, NoticeStatusEnum, NOTICE_REDIRECT_URLS_MAP } from './enum';
// import { PatientDetailTabsEnum } from '@/modules/patient-list/pages/Detail';
import NoticeStore from '@/stores/notice';
import styles from './notice-item.module.less';

interface ComponentProps {
  item: NoticeItemType;
  onRead?: (id: number) => void;
  onDelete?: (id: number) => void;
}

function NoticeItem(props: ComponentProps) {
  const { item, onRead, onDelete } = props;
  const navigate = useNavigate();
  const descriptionRef = useRef<HTMLDivElement>(null);

  const onReadItem = () => {
    NoticeFetch.readNotice({ id: item.id, status: NoticeStatusEnum.READ }).then(() => {
      if (onRead) onRead(item.id);
      // 留言消息标记已读后需要删除
      if (item.bizType === BizTypesEnum.MESSAGE_CONSULTAITON) {
        onDeleteItem();
        NoticeStore.fetchNoticeData();
      } else {
        NoticeStore.fetchNoticeData();
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  const onDeleteItem = () => {
    NoticeFetch.destroy(item.id).then(() => {
      if (onDelete) onDelete(item.id);
    }).catch((err) => {
      console.log(err);
    });
  };

  const onViewDetail = () => {
    if (!item.isRedirect) return;
    // 标记已读
    onReadItem();
    NoticeStore.setDrawerVisible(false);

    // if (item.bizType === BizTypesEnum.PROGRAM) {
    //   navigate(`${NOTICE_REDIRECT_URLS_MAP[item.bizType]}${item.memberId}?tab=${PatientDetailTabsEnum.CBTI_PROGRAM}`);
    // }

    // if (item.bizType === BizTypesEnum.SLEEP_PRESCRIPTION) {
    //   navigate(`${NOTICE_REDIRECT_URLS_MAP[item.bizType]}${item.memberId}?tab=${PatientDetailTabsEnum.SLEEP_PRESCRIPTION}`);
    // }

    if (item.bizType === BizTypesEnum.ELECTRONIC_MEDICAL_RECORD) {
      navigate(`${NOTICE_REDIRECT_URLS_MAP[item.bizType]}${item.bizId}`);
    }

    if (item.bizType === BizTypesEnum.MESSAGE_CONSULTAITON) {
      navigate(`${NOTICE_REDIRECT_URLS_MAP[item.bizType]}?memberId=${item.memberId}&&messageId=${item.bizId}`);
    }
  };

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.innerHTML = (item.description ?? '').replace(/#([^#]*)#/g, '<span style="color:#2F54EB;">$1</span>');
    }
  }, [item]);

  return (
    <div className={styles['notice-item']}>
      <div className={styles['notice-item-content']}>
        <div
          className={styles['notice-item-content-top']}
          onClick={onViewDetail}
          aria-hidden
        >
          <div className={styles['notice-item-title']}>
            <span>
              { item.status === 0 && <Badge status="error" />}
              { item.title }
            </span>
            { !!item.isRedirect && (
            <div className={styles['notice-item-title-arrow']}>
              <RightOutlined style={{ color: '#999' }} />
            </div>
            )}
          </div>

          <div className={styles['notice-item-description']} ref={descriptionRef} />
        </div>

        <div className={styles['notice-item-footer']}>
          <span>{renderDateTime(item.createdAt ?? 0)}</span>
          <span
            className={styles['notice-item-footer-read']}
            onClick={onReadItem}
            aria-hidden
          >
            {item.status === 0 && (
              <>
                <MailOutlined style={{ margin: '0 4px' }} />
                <span>标为已读</span>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NoticeItem;
