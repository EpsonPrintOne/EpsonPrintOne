import { markdownify } from "@/lib/utils/textConverter";
import React, { useState } from "react";
import DynamicIcon from "./DynamicIcon";

const Search = ({ faq_list }: { faq_list: any }) => {
  const [terms, setTerms] = useState<string>("");
  let searchResult = faq_list;

  if (terms) {
    searchResult = faq_list.filter((faq: any) => {
      return (
        faq.title.toLowerCase().includes(terms.toLowerCase()) ||
        faq.content.toLocaleLowerCase().includes(terms.toLowerCase())
      );
    });
  }

  return (
    <>
      <div className="lg:col-8 mb-12">
        <form className="relative flex items-center">
          <DynamicIcon
            className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-text-dark dark:text-body"
            icon="FaMagnifyingGlass"
          />
          <input
            onChange={(e) => {
              setTerms(e.target.value);
            }}
            className="py-3 flex-1 focus:border-primary focus:shadow-0 focus:ring-0 pl-9 border border-border dark:border-darkmode-border rounded-sm dark:bg-darkmode-light"
            type="text"
            name="search"
            placeholder="Click and search FAQ..."
          />
        </form>
      </div>

      <div className="lg:col-8 mb-12">
        {searchResult?.map((faq: any, index: number) => {
          const { title, content } = faq;
          return (
            <div
              key={index}
              className="bg-body dark:hover:border-0 relative dark:bg-darkmode-light border border-border dark:border-darkmode-border p-12 rounded mb-11 shadow transition hover:border-transparent hover:translate-y-[3px] duration-500 focus-within:bg-black"
            >
              <div className="flex items-start">
                <div className="absolute left-3 md:static inline-flex flex-none w-7 h-7 rounded-full bg-primary dark:bg-darkmode-primary  items-center justify-center text-body">
                  <DynamicIcon className="inline-block" icon="FaCheck" />
                </div>
                <h4 className="inline-block ml-3 font-bold">{title}</h4>
              </div>
              <p
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: markdownify(content) }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Search;
