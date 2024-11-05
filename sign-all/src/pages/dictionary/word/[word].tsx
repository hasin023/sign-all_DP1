"use client"

import Navbar from "@/components/common/Navbar"
import { Poppins } from "next/font/google"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"

const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"] })

function Word() {
  const router = useRouter()
  const [word, setWord] = useState<{
    word: string
    videos: string[]
    images: string[]
    _id: string
  }>({ word: "", videos: [], images: [], _id: "" })
  const [loading, setLoading] = useState(true)
  const [videoStates, setVideoStates] = useState<
    Record<
      number,
      {
        loading: boolean
        error: boolean
        retryCount: number
      }
    >
  >({})
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    if (!router.query.word) return

    setLoading(true)
    setVideoStates({})

    fetch(`/api/signs/word?word=${router.query.word}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setWord(response)

        // Initialize video states
        const initialStates: Record<
          number,
          { loading: boolean; error: boolean; retryCount: number }
        > = {}
        response.videos.forEach((_, index) => {
          initialStates[index] = { loading: true, error: false, retryCount: 0 }
        })
        setVideoStates(initialStates)

        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [router.query.word])

  const handleVideoError = (index: number) => {
    setVideoStates((prev) => ({
      ...prev,
      [index]: {
        loading: false,
        error: true,
        retryCount: (prev[index]?.retryCount || 0) + 1,
      },
    }))
  }

  const handleVideoLoaded = (index: number) => {
    setVideoStates((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        loading: false,
        error: false,
      },
    }))
  }

  const retryVideo = (index: number) => {
    if (videoStates[index]?.retryCount >= 3) {
      return // Stop retrying after 3 attempts
    }

    setVideoStates((prev) => ({
      ...prev,
      [index]: {
        loading: true,
        error: false,
        retryCount: prev[index]?.retryCount || 0,
      },
    }))

    if (videoRefs.current[index]) {
      videoRefs.current[index]?.load()
    }
  }

  return (
    <>
      <Head>
        <title>{word.word ? word.word : ""} Sign All</title>
      </Head>
      <div className={`${poppins.className} min-h-screen bg-gray-100`}>
        <Navbar />
        <div className='max-w-7xl mx-auto grid py-5 md:grid-cols-1 items-center'>
          {loading ? (
            <div className='flex justify-center items-center h-screen'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
            </div>
          ) : !word.word ? (
            <div className='flex justify-center items-center h-screen'>
              No word found
            </div>
          ) : (
            <div className='bg-white p-4 m-4 rounded shadow-lg'>
              <h2 className='text-2xl font-bold'>{word.word.toUpperCase()}</h2>
              <p className='pb-12 text-gray-600'>
                in ASL (American Sign Language)
              </p>
              {word.videos.length > 0 && (
                <div className='grid justify-center items-center gap-4'>
                  {word.videos.map((videoUrl, i) => (
                    <div key={`${videoUrl}-${i}`} className='relative'>
                      {videoStates[i]?.loading && (
                        <div className='absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 rounded-lg'>
                          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
                        </div>
                      )}

                      {videoStates[i]?.error ? (
                        <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                          <p className='text-red-600 mb-2'>
                            Failed to load video
                          </p>
                          {videoStates[i]?.retryCount < 3 && (
                            <button
                              onClick={() => retryVideo(i)}
                              className='bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 transition-colors'
                            >
                              Retry
                            </button>
                          )}
                        </div>
                      ) : (
                        <video
                          ref={(el) => (videoRefs.current[i] = el)}
                          className='rounded-lg max-w-full'
                          width='640'
                          height='480'
                          controls
                          controlsList='nodownload'
                          onContextMenu={(e) => e.preventDefault()}
                          onError={() => handleVideoError(i)}
                          onLoadedData={() => handleVideoLoaded(i)}
                        >
                          <source
                            src={`/api/proxy-video?url=${encodeURIComponent(
                              videoUrl
                            )}`}
                            type='video/mp4'
                          />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Word
