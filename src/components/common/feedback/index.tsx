import styles from './index.module.scss';
import noDataSrc from '@/assets/common/no-data.svg';
import noAccessSrc from '@/assets/common/no-access.svg';
import { CSSProperties, ReactNode } from 'react';

export type FeedbackProps = {
  description?: string;
  fontSize?: string;
  style?: CSSProperties;
  children?: ReactNode;
  imageStyle?: CSSProperties;
};
export function NoData({ description, style, fontSize, imageStyle, children }: FeedbackProps) {
  return (
    <div className={styles.feedbackContainer} style={{ fontSize: fontSize, ...style }
    }>
      <img src={noDataSrc} alt="no-data" style={imageStyle} />
      <div>{description ?? '暂无内容'}</div>
      {children}
    </div>
  );
}

export function NoAccess({ description, style, fontSize, imageStyle, children }: FeedbackProps) {
  return (
    <div className={styles.feedbackContainer} style={{ fontSize: fontSize, ...style }
    }>
      <img src={noAccessSrc} alt="no-access" style={imageStyle} />
      <div>{description ?? '暂无权限'}</div>
      {children}
    </div>
  );
}

export function NotFound({ description, style, fontSize, children, imageStyle }: FeedbackProps) {
  return (
    <div className={styles.feedbackContainer} style={{ fontSize: fontSize, ...style }
    }>
      <img src={noDataSrc} alt="no-access" style={imageStyle} />
      <div>{description ?? '页面不存在'}</div>
      {children}
    </div>
  );
}
