import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VolHeader from "../../components/VolHeader";
import { useDispatch, useSelector } from "react-redux";

import { getRequestsByVolunteerCategory, updateRequestStatus } from "../../redux/Actions/chatRequestAction";

export const Request = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { requests, loading, error } = useSelector((state) => state.chatRequest);
	
	// Filter for pending requests (this was missing)
	const pendingRequests = requests?.filter(request => request.status === "pending") || [];

	useEffect(() => {
		dispatch(getRequestsByVolunteerCategory());
	}, [dispatch]);

	const handleAccept = (id) => {
		console.log(id);
		dispatch(updateRequestStatus(id, "accepted"));
	};

	const handleReject = (id) => {
		console.log(id);
		dispatch(updateRequestStatus(id, "rejected"));
	};

  return (
    <>
      <VolHeader />
      <div className="min-h-screen bg-gray-50">
        <div className="flex-1 max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold p-6 pt-8 text-gray-800">
            Chat Requests
          </h1>

          <main className="p-6 pt-0">
            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-8 flex justify-center items-center">
                <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="ml-3 text-gray-600">Loading requests...</span>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-orange-100 bg-orange-50">
                  <h2 className="text-xl font-semibold text-orange-700">
                    Pending Requests {pendingRequests.length > 0 && `(${pendingRequests.length})`}
                  </h2>
                </div>

                <div className="divide-y divide-orange-100">
                  {loading ? (
                    <p className="p-4">Loading requests...</p>
                  ) : error ? (
                    <p className="p-4 text-red-500">{error}</p>
                  ) : requests?.length === 0 ? (
                    <p className="p-4">No pending requests found.</p>
                  ) : (
                    requests?.map((request) => (
                      <div
                        key={request?._id}
                        className={`p-4 ${
                          request.status === "accepted"
                            ? "bg-green-50"
                            : request.status === "rejected"
                            ? "bg-red-50"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-lg">
                              {request.userId?.firstName} {request.userId?.lastName}
                            </h3>
                            <p className="text-gray-600">{request.Topic}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(request.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="space-x-2">
                            {request.status === "pending" ? (
                              <>
                                <button
                                  onClick={() => handleAccept(request._id)}
                                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleReject(request._id)}
                                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <span
                                className={`px-3 py-1 rounded text-white ${
                                  request.status === "accepted"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              >
                                {request.status.charAt(0).toUpperCase() +
                                  request.status.slice(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      <footer className="bg-white shadow-sm border-t border-gray-200 p-4 text-center text-black-800">
        <p className="text-sm">
          &copy; 2025 MindEaseConnect. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Request;