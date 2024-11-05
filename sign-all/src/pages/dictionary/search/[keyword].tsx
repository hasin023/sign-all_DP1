import Navbar from "@/components/common/Navbar"
import Searchbar from "@/components/common/Searchbar"
import Spinner from "@/components/common/Spinner"
import { Poppins } from "next/font/google"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"

const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"] })

export default function DictionarySearchResults() {
  const [words, setWords] = useState([] as { word: string; _id: string }[])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState("here") // Example query
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/signs/search?query=${query}&page=${page + 1}`)
      .then((response) => response.json())
      .then((response) => {
        setWords(response.contents || [])
        setTotalPages(response.totalPages)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [page, query])

  function onPageChange(selectedItem: { selected: number }) {
    setPage(selectedItem.selected)
  }

  return (
    <>
      <Head>
        <title>Search Results - Silent Voice</title>
      </Head>

      <div className={`${poppins.className} min-h-screen bg-box`}>
        <Navbar />
        <div className='px-4'>
          <div className='glass-primary my-12 p-4 rounded border mx-auto max-w-7xl'>
            <h1 className='text-2xl font-bold'>Search Results for "{query}"</h1>
            <p className='text-lg text-gray-600'>
              Total {words.length} words found
            </p>
            <Searchbar />
          </div>

          <div className='pt-8'>
            {loading ? (
              <Spinner />
            ) : (
              <div className='grid gap-4 lg:grid-cols-3 md:grid-cols-2 text-center'>
                {words.map((word, i) => (
                  <div
                    key={word._id}
                    className='glass-primary p-4 rounded-lg shadow-md flex justify-between items-center'
                  >
                    <span className='font-semibold text-lg'>{word.word}</span>
                    <Link href={`/dictionary/word/${word.word}`}>
                      <button className='px-3 py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-600'>
                        View
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <ReactPaginate
            className='flex justify-center items-center gap-4 flex-wrap py-12'
            pageLinkClassName={
              "px-3 text-sm py-1 bg-red-500 rounded shadow-sm m-2 hover:bg-red-600 text-white font-semibold"
            }
            pageCount={totalPages}
            breakLabel='...'
            nextLabel='>'
            previousLabel='<'
            previousLinkClassName='px-4 py-2 rounded-md outline-none hover:bg-red-500 hover:text-white'
            nextLinkClassName='px-4 py-2 rounded-md outline-none hover:bg-red-500 hover:text-white'
            pageRangeDisplayed={5}
            onPageChange={onPageChange}
            activeLinkClassName='!bg-gray-800 !text-white'
          />
        </div>
      </div>
    </>
  )
}
