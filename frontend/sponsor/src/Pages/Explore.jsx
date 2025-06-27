import sponsorList from "../api/sponsorList.json";
import { CountryCard } from "../Components/Ui/CountryCard";

export const Explore = () => {
  return (
    <>
      <section className="country-section container ">
        {/* <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          data={data}
          setData={setData}
        /> */}

        <ul className="grid grid-three-cols">
          {sponsorList.map((curData) => {
            return <CountryCard key={curData.id} curData={curData} />;
          })}
        </ul>
      </section>
    </>
  );
};
