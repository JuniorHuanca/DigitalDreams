import { ITheme } from "@/shared/util/types";
import FlexCenter from "../FlexCenter";
import styles from "./LoaderModal.module.css";
import { Box, useTheme } from "@mui/material";

type Props = {};

const LoaderModal = (props: Props) => {
  const theme: ITheme = useTheme();

  return (
    <div className="fixed top-0 w-screen h-screen bg-black/60 z-[9999]">
      <FlexCenter>
        <div className={`${styles.loader} ${styles.loader1}`}>
          <div
            style={{
              borderTopColor: theme.palette.secondary[500],
              borderBottomColor: theme.palette.primary[100],
            }}
          >
            <div
              style={{
                borderTopColor: theme.palette.secondary[500],
                borderBottomColor: theme.palette.primary[100],
              }}
            >
              <div
                style={{
                  borderTopColor: theme.palette.secondary[500],
                  borderBottomColor: theme.palette.primary[100],
                }}
              >
                <div
                  style={{
                    borderTopColor: theme.palette.secondary[500],
                    borderBottomColor: theme.palette.primary[100],
                  }}
                >
                  <div
                    style={{
                      borderTopColor: theme.palette.secondary[500],
                      borderBottomColor: theme.palette.primary[100],
                    }}
                  >
                    <div
                      style={{
                        borderTopColor: theme.palette.secondary[500],
                        borderBottomColor: theme.palette.primary[100],
                      }}
                    ></div>
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
                    <div></div>
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
    </div>
  );
};

export default LoaderModal;
