"use client";
import styles from "./Search.module.css";
// Imports
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSubmit = (event: React.SyntheticEvent) => {
    const params = new URLSearchParams(searchParams);
    const target = event.target as typeof event.target & {
      searchTerm: {
        value: string;
      };
    };

    const term = target.searchTerm.value;

    // Set `query` if `term`
    if(term){
      params.set('query', term)
    } else {
      params.delete('query')
    }
    // Remove `query` if not `term`
    // Replace path
    router.replace(`${pathname}?${params.toString()}`)
  };

  return (
    <form className={styles.search_bar} onSubmit={handleSubmit}>
      <input
        className={styles.search_term}
        name="searchTerm"
        defaultValue={searchParams.get("query") || ""}
        placeholder={placeholder}
      />
      <button className={styles.search_button} type="submit">
        Search
      </button>
    </form>
  );
}
