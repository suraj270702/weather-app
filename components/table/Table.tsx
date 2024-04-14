"use client";
import React, { useCallback, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useGetCitiesQuery, useGetSuggestedCitiesQuery } from "@/lib/store/Api";
import { increment, setSearchQuery,setSortName,incrementByAmount } from "@/lib/store/filter";

import { add,reset } from "@/lib/store/CitySlice";
import { setCoordinates } from "@/lib/store/CoordinatesSlice";
import { useRouter } from "next/navigation";
import { ChevronUp,ChevronDown } from "lucide-react";



const Table = () => {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector<RootState, number>(
    (state) => state.filter.value
  );
  const sort  = useSelector<RootState,string>(
    (state)=>state.filter.sort
  )
  const cityData = useSelector(
    (state: RootState) => state.city.cities 
  );
  const searchCityData: string = useSelector<RootState, string>(
    (state) => state.filter.search
  );
  // console.log(searchCityData)
  function capitalizeFirstLetter(str: any) {
    if (!str) {
      return;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  
  const { data: suggestedCitiesData } = useGetSuggestedCitiesQuery({
    name: capitalizeFirstLetter(searchCityData),
  });
  
  const {
    data: citiesData,
    isLoading,
  } =
    useGetCitiesQuery({ page: data,name:sort });

  const handleScroll = useCallback(() => {
    //console.log("windowScrollHeight",document.documentElement.scrollHeight)
    //console.log("windowScrollTop",document.documentElement.scrollTop)
    //console.log("widthInner",window.innerHeight)
    const isAtBottom =
      window.innerHeight + document.documentElement.scrollTop + 140 >=
      document.documentElement.scrollHeight;

    if (isAtBottom && !isLoading) {
      console.log("condition checked");
      dispatch(increment());
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (citiesData && citiesData?.results.length > 0) {
      citiesData.results.forEach((city) => {
        dispatch(add(city)); 
      });
    }
  }, [citiesData]);

  

  const handleClick =(item:{lon:number, lat: number,name:string})=>{
    dispatch(setCoordinates({lon:item.lon,lat:item.lat,name:item.name}))
    router.push("/weather")
  }

  const handleRightClick = (event:any, lon:number, lat:number,name:string) => {
    event.preventDefault(); 
    localStorage.setItem("longitude",lon.toString())
    localStorage.setItem("latitude",lat.toString())
    localStorage.setItem("cityName",name)

    //console.log('Right-clicked with lon:', lon, 'lat:', lat);
    dispatch(setCoordinates({lon:lon,lat:lat}))
    window.open("/weather", '_blank');
  };

  const handlePopulationSorting = (type:string,increment:boolean) => {
    if(type === "population"){
      if(increment){
        dispatch(setSortName("-population")); 
      }else{
        dispatch(setSortName("population")); 
      }
    }
    
    if(type === "name"){
      if(increment){
        dispatch(setSortName("-ascii_name")); 
      }else{
        dispatch(setSortName("ascii_name")); 
      }
    }

    if(type === "country_name"){
      if(increment){
        dispatch(setSortName("-cou_name_en")); 
      }else{
        dispatch(setSortName("cou_name_en")); 
      }
    }

    
    
    dispatch(reset([])); 
  
    
    dispatch(incrementByAmount(0));
  
    
    if (citiesData && citiesData.results.length > 0) {
      citiesData.results.slice(30).forEach((city) => {
        dispatch(add(city));
      });
    }
  };

  

  return (
    <div className="lg:relative w-full overflow-x-auto" onClick={()=>dispatch(setSearchQuery(""))}>
      {
        cityData.length > 0 && (
          <div className=" ">
        <input
          type="text"
          value={searchCityData}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          onClick={(e) => e.stopPropagation()}
          placeholder="search a city by name"
          className="bg-transparent w-full lg:w-[80%] lg:ml-[10%]   py-3 border border-white  pl-3   rounded-lg placeholder:text-white text-white"
        />
      </div>
        )
      }
      {
        searchCityData && suggestedCitiesData && (
          <div className="absolute mt-10 border border-white rounded-lg p-5 w-full  mx-auto z-50 bg-white">
        <div>
          {suggestedCitiesData.results.length > 0 ? suggestedCitiesData.results.map((item, i) => (
            <div key={i} onClick={()=>handleClick({lon:item.coordinates.lon,lat:item.coordinates.lat,name:item.name})} className="mb-3 text-gray-700 font-bold py-2 hover:gray-200 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-200">{item.name}</div>
          )) : <h1 className="text-center font-bold text-[20px] text-gray-700">No Cities Found</h1>}
        </div>
      </div>
        )
      }
      {cityData.length > 0 && (
        <div className=" relative overflow-x-auto">
          <table className="mt-10  w-[95%] mx-auto text-sm text-left rtl:text-right border border-gray-700 z-10 overflow-x-auto">
          <thead className="text-xs text-white uppercase border-b border-gray-700 w-full">
            <tr className="w-full">
              <th scope="col" className="px-6 py-3 flex items-center gap-x-5">
                City Name
                <div className="flex flex-col">
                  <button disabled={sort==="ascii_name"} className="" onClick={()=>handlePopulationSorting("name",false)}><ChevronUp className="h-[20px] w-[20px]" /></button>
                  <button disabled={sort === "-ascii_name"} className="" onClick={()=>handlePopulationSorting("name",true)}><ChevronDown className="h-[20px] w-[20px]" /></button>

                </div>
              </th>
              <th scope="col" className="px-6 py-3  ">
                <div className="flex items-center gap-x-5">
                Country Name
                <div className="flex flex-col">
                  <button disabled={sort==="cou_name_en"} className="" onClick={()=>handlePopulationSorting("country_name",false)}><ChevronUp className="h-[20px] w-[20px]" /></button>
                  <button disabled={sort === "-cou_name_en"} className="" onClick={()=>handlePopulationSorting("country_name",true)}><ChevronDown className="h-[20px] w-[20px]" /></button>

                </div>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 flex items-center gap-x-5">
                Population
                <div className="flex flex-col">
                  <button disabled={sort==="population"} className="" onClick={()=>handlePopulationSorting("population",false)}><ChevronUp className="h-[20px] w-[20px]" /></button>
                  <button disabled={sort === "-population"} className="" onClick={()=>handlePopulationSorting("population",true)}><ChevronDown className="h-[20px] w-[20px]" /></button>

                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Timezone
              </th>
            </tr>
          </thead>
          <tbody className="">
            {cityData.map((item, i) => (
              <tr className=" border-b  border-gray-700 cursor-pointer" key={i} onClick={()=>handleClick({lon:item.coordinates.lon,lat:item.coordinates.lat,name:item.ascii_name})} onContextMenu={(e) => handleRightClick(e, item.coordinates.lon, item.coordinates.lat,item.ascii_name)}>
                <td className="px-6 py-4">{item.ascii_name}</td>
                <td className="px-6 py-4">{item.cou_name_en}</td>
                <td className="px-6 py-4">{item.population}</td>
                <td className="px-6 py-4">{item.timezone}</td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
      )}
    </div>
  );
};

export default Table;
