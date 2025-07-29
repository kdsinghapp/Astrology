import React, { useState, useEffect, useCallback } from "react";
// import { Card } from "@material-ui/core";
import { Card } from "@mui/material";
import DataNotFound from "../DataNotFound";
import { getTransactionLogsApi } from "../api/transationapi";

const TransactionsLogs = ({ currency }) => {
  const [paymentLogs, setPaymentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);

  const fetchUserMessage = useCallback(async () => {
    const payload = {
      page: page,
      limit: limit,
    };
    setLoading(true);
    try {
      const resp = await getTransactionLogsApi(payload);
      if (resp.data.results.length < limit) {
        setHasMore(false);
      }
      setPaymentLogs((prev) => [...prev, ...resp.data.results]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchUserMessage();
  }, [fetchUserMessage]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const getLoader = () => {
    if (loading) {
      return (
        <div className="col-sm-12 text-center py-2 text-bold">Loading...</div>
      );
    } else {
      return (
        <div className="col-sm-12">
          <DataNotFound />
        </div>
      );
    }
  };

  return (
    <div>
      <div className="row">
        {!paymentLogs.length
          ? getLoader()
          : paymentLogs.map((item) => {
              return (
                <div
                  key={item._id}
                  className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3"
                >
                  <Card className="Card_shadow card_div p-2">
                    <div
                      id="card"
                      style={{ height: "150px", fontSize: "15px" }}
                      className="d-flex align-items-center justify-content-between"
                    >
                      <div className="card_top">
                        <div className="transactions_top_right">
                          <div className="transactions_details p-0">
                            <div
                              className="call_history"
                              style={{ width: "80%" }}
                            >
                              <h6 className="mb-0">
                                Wallet recharge through Razorpay
                              </h6>
                            </div>
                            <div className="text-success call_price">
                              + {currency === "INR" ? "₹" : "$"}
                              {item.amount?.toFixed(2)}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between mt-2">
                            <div className="font-weight-normal">Order Id</div>
                            <div className="font-weight-normal">
                              {item.order_id}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between mt-2">
                            <div className="font-weight-normal">
                              Transactions Id
                            </div>
                            <div className="font-weight-normal">
                              {item.transaction_id}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between mt-2">
                            <div className="font-weight-normal">
                              {item.Created_date}
                            </div>
                            <div
                              className="font-weight-normal text-capitalize"
                              style={{
                                color:
                                  item.status === "success" ? "green" : "red",
                              }}
                            >
                              {item.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
      </div>
      {!!paymentLogs.length && hasMore && (
        <div className="text-center mt-3">
          <button
            onClick={loadMore}
            className="btn btn-outline-primary btn-sm p-2"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionsLogs;
