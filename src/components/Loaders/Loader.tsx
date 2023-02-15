import { ITheme } from '@/shared/util/types';
import FlexCenter from '../FlexCenter';
import styles from './Loader.module.css';
import { Box, useTheme } from "@mui/material";

type Props = {}

const Loader = (props: Props) => {
    const theme: ITheme = useTheme();

    return (
        <FlexCenter>
            {/* <div className={styles.loader}>
                <div className={styles.bar + ' ' + styles.bar1}></div>
                <div className={styles.bar + ' ' + styles.bar2}></div>
                <div className={styles.bar + ' ' + styles.bar3}></div>
                <div className={styles.bar + ' ' + styles.bar4}></div>
                <div className={styles.bar + ' ' + styles.bar5}></div>
                <div className={styles.bar + ' ' + styles.bar6}></div>
                <div className={styles.bar + ' ' + styles.bar7}></div>
                <div className={styles.bar + ' ' + styles.bar8}></div>
            </div> */}
            <div className={`${styles.loader} ${styles.loader1}`}>
                <div
                    style={{ borderTopColor: theme.palette.secondary[500], borderBottomColor: theme.palette.primary[100] }}>
                    <div
                    style={{ borderTopColor: theme.palette.secondary[500], borderBottomColor: theme.palette.primary[100] }}>
                        <div
                        style={{ borderTopColor: theme.palette.secondary[500], borderBottomColor: theme.palette.primary[100] }}>
                            <div
                            style={{ borderTopColor: theme.palette.secondary[500], borderBottomColor: theme.palette.primary[100] }}>
                                <div
                                style={{ borderTopColor: theme.palette.secondary[500], borderBottomColor: theme.palette.primary[100] }}>
                                    <div
                                    style={{ borderTopColor: theme.palette.secondary[500], borderBottomColor: theme.palette.primary[100] }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.loader} ${styles.loader2}`}>
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.loader} ${styles.loader3}`}>
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.loader} ${styles.loader4}`}>
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div>
                                                <div>
                                                    <div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FlexCenter>
    )
}

export default Loader