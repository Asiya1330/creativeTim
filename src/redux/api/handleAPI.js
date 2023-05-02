import axios from "axios";
const instance = axios.create({
  baseURL: "https://augateway.isolarcloud.com/openapi",
  headers: {
    "x-access-key": "",
    sys_code: 901,
  },
});
export const getData = async (tabValue) => {
  try {
    const response = await instance({
      method: "POST",
      url: "/getPowerStationList",
      data: {
        appkey: "",
        token: "",
        curPage: "1",
        valid_flag: tabValue === 0 ? 1 : 3,
        size: "50",
        lang: "_en_US",
      },
    });
    // handle response data here
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // handle error here
    console.error(error);
  }
};
