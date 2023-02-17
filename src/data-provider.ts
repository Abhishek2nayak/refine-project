import { CrudFilter, DataProvider, HttpError, useUpdate } from "@pankod/refine-core";
import { stringify } from "querystring";
import axios from "axios";
import { mapOperator } from "@pankod/refine-simple-rest";
import { useList } from "@pankod/refine-core";
import { useCreate } from "@pankod/refine-core";



const {mutate} = useUpdate();
mutate ({
    resource:"posts",
    id= 2,
    values : {title : "New Post Title"},
});
const {mutate} = useCreate();
mutate ({
    resource:"posts",
    values : {
        title : "New Post",
    },
});

///for error handling we create axios instance by extending http error
const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
 (response) => {
    return response;
 },
 (error) => {
    const customError: HttpError = {
     ...error,
     message : error.response?.data?.message,
     statusCode : error.response?.status,
    };
    return Promise.reject(customError);
 },
);

export const dataProvider = (apiUrl  : string): DataProvider => ({





    const generateFilters = (filters ?: CrudFilters) => {
        const queryFilters: { [key: string]: string } = {};
      
        filters?.map((filter): void => {
          if ("field" in filter) {
            const { field, operator, value } = filter;
            const mappedOperator = mapOperator(operator);
            queryFilters[`${field}${mappedOperator}`] = value;
          }
        });
      
        return queryFilters;
      };


      create: async({resource,variables})=> {
      const url = `${apiUrl}/${resource}`;
      const {data} = await axiosInstance.post(url,variables);
      return {
        data,
      };
      }


      update: async ({resource,id,variables})=> {
        const url  = `${apiUrl}/${resource}/${id}`;
        const {data} = await axiosInstance.patch(url,variables);
        return {
            data,
        };
      }

  getList:async ({resource})=> {
    const url  = `${apiUrl}/${resource}`;
    const {current = 1, pageSize = 10} = pagination ??{};
    const query : {
        _start ?: number;
        _end ?:number;
        _sort ?: string;
        _order?:string;

    } = {
        _start : (current - 1) * pageSize,
        _end : current * pageSize,
    };


    if(sort && sort.length > 0) {
        query._sort = sort[0].field;
        query._order = sort[0].order;
    }
        const {data,headers} = await axiosInstance.get(`${url}?${stringify(query)}`);
        const total = +headers["x-total-count"];
        return{
            data,
            total,
        };
  }
});