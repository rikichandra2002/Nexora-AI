import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/react'
import {
  Search,
  Heart,
  Eye,
  Download,
  RefreshCw,
  Loader2,
  Image as ImageIcon,
  Sparkles,
  X,
  CalendarDays,
  Globe2,
  WandSparkles,
  ArrowUpRight,
} from 'lucide-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Community = () => {

  const { getToken } = useAuth()
  const { user } = useUser()

  // =====================================================
  // STATES
  // =====================================================

  const [creations, setCreations] = useState([])

  const [loading, setLoading] = useState(true)

  const [refreshing, setRefreshing] = useState(false)

  const [error, setError] = useState('')

  const [search, setSearch] = useState('')

  const [activeFilter, setActiveFilter] =
    useState('All')

  const [selectedImage, setSelectedImage] =
    useState(null)

  const [likingId, setLikingId] =
    useState(null)

  // =====================================================
  // FILTERS
  // =====================================================

  const filters = [
    {
      id: 'All',
      label: 'All Images',
    },
    {
      id: 'AI Generated',
      label: 'AI Generated',
    },
    {
      id: 'Edited',
      label: 'AI Edited',
    },
  ]

  // =====================================================
  // GET PUBLISHED CREATIONS
  // =====================================================

  const getCommunityData = async (
    showRefresh = false
  ) => {

    try {

      if (showRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      setError('')

      const token = await getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please sign in again.'
        )
      }

      const { data } = await axios.get(
        '/api/user/get-published-creations',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!data.success) {
        throw new Error(
          data.message ||
            'Failed to load community images.'
        )
      }

      // Only show image creations
      const publicImages = (
        data.creations || []
      ).filter(
        (item) =>
          item.type === 'image'
      )

      setCreations(publicImages)

    } catch (error) {

      console.error(
        'Community error:',
        error
      )

      setError(
        error.response?.data?.message ||
          error.message ||
          'Failed to load community images.'
      )

      setCreations([])

    } finally {

      setLoading(false)
      setRefreshing(false)

    }
  }

  // =====================================================
  // LOAD COMMUNITY
  // =====================================================

  useEffect(() => {

    getCommunityData()

  }, [])

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return ''
    }

    try {

      return new Date(date).toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }
      )

    } catch {

      return ''

    }
  }

  // =====================================================
  // GET IMAGE CATEGORY
  // =====================================================

  const getImageCategory = (item) => {

    const prompt =
      (item.prompt || '').toLowerCase()

    if (
      prompt.includes('remove') ||
      prompt.includes('background') ||
      prompt.includes('object')
    ) {
      return 'Edited'
    }

    return 'AI Generated'
  }

  // =====================================================
  // FILTERED CREATIONS
  // =====================================================

  const filteredCreations = useMemo(() => {

    return creations.filter((item) => {

      const category =
        getImageCategory(item)

      const matchesFilter =
        activeFilter === 'All' ||
        category === activeFilter

      const searchText =
        `${item.prompt || ''}`
          .toLowerCase()

      const matchesSearch =
        searchText.includes(
          search.toLowerCase().trim()
        )

      return (
        matchesFilter &&
        matchesSearch
      )
    })

  }, [
    creations,
    activeFilter,
    search,
  ])

  // =====================================================
  // GET LIKES
  // =====================================================

  const getLikes = (item) => {

    if (
      Array.isArray(item.likes)
    ) {
      return item.likes
    }

    return []
  }

  // =====================================================
  // CHECK IF USER LIKED
  // =====================================================

  const isLiked = (item) => {

    if (!user?.id) {
      return false
    }

    const likes =
      getLikes(item)

    return likes.includes(
      user.id.toString()
    )
  }

  // =====================================================
  // TOGGLE LIKE
  // =====================================================

  const handleLike = async (item) => {

    if (!item?.id) {
      return
    }

    if (likingId === item.id) {
      return
    }

    try {

      setLikingId(item.id)

      const token =
        await getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found.'
        )
      }

      const { data } =
        await axios.post(
          '/api/user/toggle-like-creations',
          {
            id: item.id,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

      if (!data.success) {
        throw new Error(
          data.message ||
            'Failed to update like.'
        )
      }

      // Update only this image
      setCreations((current) =>
        current.map((creation) => {

          if (
            creation.id !== item.id
          ) {
            return creation
          }

          return {
            ...creation,
            likes:
              data.creation?.likes ||
              [],
          }

        })
      )

    } catch (error) {

      console.error(
        'Like error:',
        error
      )

      alert(
        error.response?.data?.message ||
          error.message ||
          'Unable to update like.'
      )

    } finally {

      setLikingId(null)

    }
  }

  // =====================================================
  // DOWNLOAD IMAGE
  // =====================================================

  const handleDownload = async (
    imageUrl
  ) => {

    if (!imageUrl) {
      return
    }

    try {

      const response =
        await fetch(imageUrl)

      const blob =
        await response.blob()

      const url =
        window.URL.createObjectURL(
          blob
        )

      const link =
        document.createElement('a')

      link.href = url

      link.download =
        'nexora-community-image.png'

      document.body.appendChild(link)

      link.click()

      document.body.removeChild(link)

      window.URL.revokeObjectURL(url)

    } catch (error) {

      console.error(
        'Download failed:',
        error
      )

      window.open(
        imageUrl,
        '_blank'
      )
    }
  }

  // =====================================================
  // OPEN IMAGE
  // =====================================================

  const openImage = (item) => {

    setSelectedImage(item)

  }

  // =====================================================
  // CLOSE IMAGE
  // =====================================================

  const closeImage = () => {

    setSelectedImage(null)

  }

  // =====================================================
  // KEYBOARD ESCAPE
  // =====================================================

  useEffect(() => {

    const handleKeyDown = (event) => {

      if (
        event.key === 'Escape'
      ) {
        setSelectedImage(null)
      }

    }

    window.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () => {

      window.removeEventListener(
        'keydown',
        handleKeyDown
      )

    }

  }, [])

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        backgroundColor: '#f5f8fc',
        padding:
          '32px 40px 60px 60px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >

      <div
        style={{
          width: '100%',
          maxWidth: '1120px',
          margin: '0 auto',
        }}
      >

        {/* =================================================
            HERO HEADER
        ================================================== */}

        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            padding: '30px 32px',
            marginBottom: '28px',
            background:
              'linear-gradient(135deg, #eef2ff 0%, #fdf2f8 50%, #ecfeff 100%)',
            border:
              '1px solid #e2e8f0',
          }}
        >

          {/* Decorative circles */}

          <div
            style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background:
                'rgba(129, 140, 248, 0.12)',
              top: '-90px',
              right: '80px',
            }}
          />

          <div
            style={{
              position: 'absolute',
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              background:
                'rgba(236, 72, 153, 0.10)',
              bottom: '-70px',
              right: '-20px',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
            }}
          >

            {/* Badge */}

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding:
                  '6px 10px',
                borderRadius: '999px',
                backgroundColor:
                  'rgba(255,255,255,0.80)',
                border:
                  '1px solid rgba(148,163,184,0.25)',
                fontSize: '10px',
                fontWeight: 600,
                color: '#6366f1',
                marginBottom: '13px',
              }}
            >

              <Sparkles size={13} />

              NEXORA AI COMMUNITY

            </div>


            <h1
              style={{
                margin: 0,
                fontSize: '28px',
                lineHeight: 1.2,
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              Explore AI Creations
            </h1>


            <p
              style={{
                margin:
                  '8px 0 0',
                maxWidth: '620px',
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#64748b',
              }}
            >
              Discover images created by the
              Nexora AI community. Create something
              amazing and share it with everyone.
            </p>


            {/* STATS */}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                marginTop: '20px',
              }}
            >

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                }}
              >

                <ImageIcon
                  size={15}
                  color="#6366f1"
                />

                <span
                  style={{
                    fontSize: '11px',
                    color: '#475569',
                    fontWeight: 500,
                  }}
                >
                  {creations.length}{' '}
                  public images
                </span>

              </div>


              <div
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor:
                    '#cbd5e1',
                }}
              />


              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                }}
              >

                <Globe2
                  size={15}
                  color="#ec4899"
                />

                <span
                  style={{
                    fontSize: '11px',
                    color: '#475569',
                    fontWeight: 500,
                  }}
                >
                  Public community
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            TOOLBAR
        ================================================== */}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '15px',
            marginBottom: '22px',
            flexWrap: 'wrap',
          }}
        >

          {/* FILTERS */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              flexWrap: 'wrap',
            }}
          >

            {filters.map(
              (filter) => {

                const active =
                  activeFilter ===
                  filter.id

                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() =>
                      setActiveFilter(
                        filter.id
                      )
                    }
                    style={{
                      height: '34px',
                      padding:
                        '0 13px',
                      borderRadius: '9px',
                      border: active
                        ? '1px solid #818cf8'
                        : '1px solid #e2e8f0',
                      backgroundColor:
                        active
                          ? '#eef2ff'
                          : '#ffffff',
                      color: active
                        ? '#4f46e5'
                        : '#64748b',
                      fontSize: '11px',
                      fontWeight:
                        active
                          ? 600
                          : 500,
                      cursor:
                        'pointer',
                      transition:
                        'all 0.2s ease',
                    }}
                  >
                    {filter.label}
                  </button>
                )

              }
            )}

          </div>


          {/* SEARCH + REFRESH */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
            }}
          >

            {/* SEARCH */}

            <div
              style={{
                position:
                  'relative',
                width: '230px',
              }}
            >

              <Search
                size={15}
                color="#94a3b8"
                style={{
                  position:
                    'absolute',
                  left: '11px',
                  top: '50%',
                  transform:
                    'translateY(-50%)',
                }}
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search creations..."
                style={{
                  width: '100%',
                  height: '34px',
                  padding:
                    '0 11px 0 34px',
                  boxSizing:
                    'border-box',
                  border:
                    '1px solid #e2e8f0',
                  borderRadius: '9px',
                  outline: 'none',
                  backgroundColor:
                    '#ffffff',
                  color: '#334155',
                  fontSize: '11px',
                }}
              />

            </div>


            {/* REFRESH */}

            <button
              type="button"
              onClick={() =>
                getCommunityData(true)
              }
              disabled={refreshing}
              title="Refresh community"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '9px',
                border:
                  '1px solid #e2e8f0',
                backgroundColor:
                  '#ffffff',
                display: 'flex',
                alignItems:
                  'center',
                justifyContent:
                  'center',
                cursor:
                  refreshing
                    ? 'not-allowed'
                    : 'pointer',
                opacity:
                  refreshing
                    ? 0.6
                    : 1,
              }}
            >

              <RefreshCw
                size={15}
                color="#64748b"
                className={
                  refreshing
                    ? 'animate-spin'
                    : ''
                }
              />

            </button>

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================== */}

        {!loading &&
          error && (

            <div
              style={{
                width: '100%',
                minHeight: '220px',
                backgroundColor:
                  '#ffffff',
                border:
                  '1px solid #fecaca',
                borderRadius: '16px',
                display: 'flex',
                flexDirection:
                  'column',
                alignItems:
                  'center',
                justifyContent:
                  'center',
                textAlign: 'center',
                padding: '30px',
                boxSizing:
                  'border-box',
              }}
            >

              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius:
                    '12px',
                  backgroundColor:
                    '#fff1f2',
                  display: 'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                }}
              >

                <ImageIcon
                  size={22}
                  color="#ef4444"
                />

              </div>


              <h3
                style={{
                  margin:
                    '13px 0 0',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#334155',
                }}
              >
                Unable to load community
              </h3>


              <p
                style={{
                  margin:
                    '6px 0 0',
                  maxWidth: '400px',
                  fontSize: '11px',
                  lineHeight: 1.6,
                  color: '#94a3b8',
                }}
              >
                {error}
              </p>


              <button
                type="button"
                onClick={() =>
                  getCommunityData()
                }
                style={{
                  marginTop: '15px',
                  height: '34px',
                  padding:
                    '0 15px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor:
                    '#4f46e5',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>

            </div>

          )}


        {/* =================================================
            LOADING SKELETON
        ================================================== */}

        {loading && (

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(3, minmax(0, 1fr))',
              gap: '18px',
            }}
          >

            {[1, 2, 3, 4, 5, 6].map(
              (item) => (

                <div
                  key={item}
                  style={{
                    backgroundColor:
                      '#ffffff',
                    border:
                      '1px solid #e2e8f0',
                    borderRadius:
                      '15px',
                    overflow:
                      'hidden',
                  }}
                >

                  <div
                    style={{
                      width: '100%',
                      height: '245px',
                      background:
                        'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                      backgroundSize:
                        '200% 100%',
                      animation:
                        'communityShimmer 1.5s infinite',
                    }}
                  />

                  <div
                    style={{
                      padding: '14px',
                    }}
                  >

                    <div
                      style={{
                        width: '70%',
                        height: '12px',
                        borderRadius:
                          '6px',
                        backgroundColor:
                          '#e2e8f0',
                      }}
                    />

                    <div
                      style={{
                        width: '45%',
                        height: '9px',
                        borderRadius:
                          '6px',
                        backgroundColor:
                          '#f1f5f9',
                        marginTop:
                          '9px',
                      }}
                    />

                  </div>

                </div>

              )
            )}

          </div>

        )}


        {/* =================================================
            EMPTY STATE
        ================================================== */}

        {!loading &&
          !error &&
          filteredCreations.length === 0 && (

            <div
              style={{
                width: '100%',
                minHeight: '330px',
                backgroundColor:
                  '#ffffff',
                border:
                  '1px solid #e2e8f0',
                borderRadius:
                  '16px',
                display: 'flex',
                flexDirection:
                  'column',
                alignItems:
                  'center',
                justifyContent:
                  'center',
                textAlign: 'center',
                padding: '35px',
                boxSizing:
                  'border-box',
              }}
            >

              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius:
                    '20px',
                  background:
                    'linear-gradient(135deg, #eef2ff, #fdf2f8)',
                  display: 'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                }}
              >

                <WandSparkles
                  size={30}
                  color="#8b5cf6"
                />

              </div>


              <h3
                style={{
                  margin:
                    '17px 0 0',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#334155',
                }}
              >
                {creations.length === 0
                  ? 'No public creations yet'
                  : 'No matching creations'}
              </h3>


              <p
                style={{
                  margin:
                    '7px 0 0',
                  maxWidth: '420px',
                  fontSize: '12px',
                  lineHeight: 1.7,
                  color: '#94a3b8',
                }}
              >
                {creations.length === 0
                  ? 'Generate an image and turn on "Make this image public" to share it with the Nexora AI community.'
                  : 'Try another search term or choose a different category.'}
              </p>


              {search && (

                <button
                  type="button"
                  onClick={() =>
                    setSearch('')
                  }
                  style={{
                    marginTop:
                      '15px',
                    height: '34px',
                    padding:
                      '0 14px',
                    borderRadius:
                      '8px',
                    border:
                      '1px solid #e2e8f0',
                    backgroundColor:
                      '#ffffff',
                    color: '#6366f1',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor:
                      'pointer',
                  }}
                >
                  Clear Search
                </button>

              )}

            </div>

          )}


        {/* =================================================
            COMMUNITY GRID
        ================================================== */}

        {!loading &&
          !error &&
          filteredCreations.length > 0 && (

            <div
              className="community-grid"
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(3, minmax(0, 1fr))',
                gap: '18px',
              }}
            >

              {filteredCreations.map(
                (item) => {

                  const likes =
                    getLikes(item)

                  const liked =
                    isLiked(item)

                  const category =
                    getImageCategory(
                      item
                    )

                  return (

                    <div
                      key={item.id}
                      style={{
                        backgroundColor:
                          '#ffffff',
                        border:
                          '1px solid #e2e8f0',
                        borderRadius:
                          '15px',
                        overflow:
                          'hidden',
                        boxShadow:
                          '0 3px 10px rgba(15,23,42,0.04)',
                        transition:
                          'all 0.25s ease',
                      }}
                      onMouseEnter={(
                        e
                      ) => {

                        e.currentTarget.style.transform =
                          'translateY(-3px)'

                        e.currentTarget.style.boxShadow =
                          '0 12px 30px rgba(15,23,42,0.10)'

                      }}
                      onMouseLeave={(
                        e
                      ) => {

                        e.currentTarget.style.transform =
                          'translateY(0)'

                        e.currentTarget.style.boxShadow =
                          '0 3px 10px rgba(15,23,42,0.04)'

                      }}
                    >

                      {/* =================================
                          IMAGE
                      ================================== */}

                      <div
                        style={{
                          position:
                            'relative',
                          width: '100%',
                          height: '250px',
                          backgroundColor:
                            '#f8fafc',
                          overflow:
                            'hidden',
                          cursor:
                            'pointer',
                        }}
                        onClick={() =>
                          openImage(
                            item
                          )
                        }
                      >

                        <img
                          src={
                            item.content
                          }
                          alt={
                            item.prompt ||
                            'Community creation'
                          }
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit:
                              'cover',
                            display:
                              'block',
                            transition:
                              'transform 0.35s ease',
                          }}
                          onError={(
                            e
                          ) => {

                            e.currentTarget.style.display =
                              'none'

                          }}
                          onMouseEnter={(
                            e
                          ) => {

                            e.currentTarget.style.transform =
                              'scale(1.04)'

                          }}
                          onMouseLeave={(
                            e
                          ) => {

                            e.currentTarget.style.transform =
                              'scale(1)'

                          }}
                        />


                        {/* PUBLIC BADGE */}

                        <div
                          style={{
                            position:
                              'absolute',
                            top: '11px',
                            left: '11px',
                            display:
                              'flex',
                            alignItems:
                              'center',
                            gap: '5px',
                            padding:
                              '5px 8px',
                            borderRadius:
                              '999px',
                            backgroundColor:
                              'rgba(255,255,255,0.92)',
                            backdropFilter:
                              'blur(6px)',
                            fontSize:
                              '9px',
                            fontWeight: 600,
                            color:
                              '#15803d',
                          }}
                        >

                          <Globe2
                            size={11}
                          />

                          Public

                        </div>


                        {/* VIEW */}

                        <button
                          type="button"
                          title="View image"
                          onClick={(
                            e
                          ) => {

                            e.stopPropagation()

                            openImage(
                              item
                            )

                          }}
                          style={{
                            position:
                              'absolute',
                            right: '11px',
                            bottom: '11px',
                            width: '36px',
                            height: '36px',
                            borderRadius:
                              '10px',
                            border:
                              '1px solid rgba(255,255,255,0.8)',
                            backgroundColor:
                              'rgba(255,255,255,0.92)',
                            backdropFilter:
                              'blur(6px)',
                            display:
                              'flex',
                            alignItems:
                              'center',
                            justifyContent:
                              'center',
                            cursor:
                              'pointer',
                          }}
                        >

                          <Eye
                            size={16}
                            color="#475569"
                          />

                        </button>

                      </div>


                      {/* =================================
                          CARD CONTENT
                      ================================== */}

                      <div
                        style={{
                          padding:
                            '14px',
                        }}
                      >

                        {/* CATEGORY + DATE */}

                        <div
                          style={{
                            display:
                              'flex',
                            alignItems:
                              'center',
                            justifyContent:
                              'space-between',
                            gap: '8px',
                            marginBottom:
                              '8px',
                          }}
                        >

                          <span
                            style={{
                              fontSize:
                                '9px',
                              fontWeight:
                                700,
                              color:
                                category ===
                                'Edited'
                                  ? '#8b5cf6'
                                  : '#ec4899',
                              textTransform:
                                'uppercase',
                              letterSpacing:
                                '0.4px',
                            }}
                          >
                            {category}
                          </span>


                          <span
                            style={{
                              display:
                                'flex',
                              alignItems:
                                'center',
                              gap: '4px',
                              fontSize:
                                '9px',
                              color:
                                '#94a3b8',
                            }}
                          >

                            <CalendarDays
                              size={10}
                            />

                            {formatDate(
                              item.created_at
                            )}

                          </span>

                        </div>


                        {/* PROMPT */}

                        <p
                          style={{
                            margin: 0,
                            fontSize:
                              '12px',
                            lineHeight:
                              1.55,
                            fontWeight:
                              600,
                            color:
                              '#1e293b',
                            display:
                              '-webkit-box',
                            WebkitLineClamp:
                              2,
                            WebkitBoxOrient:
                              'vertical',
                            overflow:
                              'hidden',
                            minHeight:
                              '37px',
                          }}
                        >
                          {item.prompt ||
                            'AI generated image'}
                        </p>


                        {/* BOTTOM ACTIONS */}

                        <div
                          style={{
                            display:
                              'flex',
                            alignItems:
                              'center',
                            justifyContent:
                              'space-between',
                            marginTop:
                              '13px',
                            paddingTop:
                              '11px',
                            borderTop:
                              '1px solid #f1f5f9',
                          }}
                        >

                          {/* LIKE */}

                          <button
                            type="button"
                            disabled={
                              likingId ===
                              item.id
                            }
                            onClick={() =>
                              handleLike(
                                item
                              )
                            }
                            style={{
                              height:
                                '32px',
                              padding:
                                '0 10px',
                              borderRadius:
                                '8px',
                              border:
                                liked
                                  ? '1px solid #fbcfe8'
                                  : '1px solid #e2e8f0',
                              backgroundColor:
                                liked
                                  ? '#fdf2f8'
                                  : '#ffffff',
                              display:
                                'flex',
                              alignItems:
                                'center',
                              gap:
                                '6px',
                              cursor:
                                likingId ===
                                item.id
                                  ? 'not-allowed'
                                  : 'pointer',
                              opacity:
                                likingId ===
                                item.id
                                  ? 0.6
                                  : 1,
                            }}
                          >

                            {likingId ===
                            item.id ? (

                              <Loader2
                                size={13}
                                color="#ec4899"
                                className="animate-spin"
                              />

                            ) : (

                              <Heart
                                size={14}
                                color={
                                  liked
                                    ? '#ec4899'
                                    : '#64748b'
                                }
                                fill={
                                  liked
                                    ? '#ec4899'
                                    : 'none'
                                }
                              />

                            )}

                            <span
                              style={{
                                fontSize:
                                  '10px',
                                fontWeight:
                                  600,
                                color:
                                  liked
                                    ? '#db2777'
                                    : '#64748b',
                              }}
                            >
                              {likes.length}
                            </span>

                          </button>


                          {/* VIEW */}

                          <button
                            type="button"
                            onClick={() =>
                              openImage(
                                item
                              )
                            }
                            style={{
                              height:
                                '32px',
                              padding:
                                '0 10px',
                              borderRadius:
                                '8px',
                              border:
                                '1px solid #e2e8f0',
                              backgroundColor:
                                '#ffffff',
                              display:
                                'flex',
                              alignItems:
                                'center',
                              gap:
                                '6px',
                              cursor:
                                'pointer',
                              color:
                                '#64748b',
                              fontSize:
                                '10px',
                              fontWeight:
                                600,
                            }}
                          >

                            <Eye
                              size={13}
                            />

                            View

                          </button>

                        </div>

                      </div>

                    </div>

                  )

                }
              )}

            </div>

          )}


        {/* =================================================
            FOOTER MESSAGE
        ================================================== */}

        {!loading &&
          !error &&
          creations.length > 0 && (

            <div
              style={{
                display:
                  'flex',
                alignItems:
                  'center',
                justifyContent:
                  'center',
                gap: '7px',
                marginTop:
                  '30px',
                paddingBottom:
                  '15px',
              }}
            >

              <Sparkles
                size={13}
                color="#a5b4fc"
              />

              <span
                style={{
                  fontSize:
                    '10px',
                  color:
                    '#94a3b8',
                }}
              >
                More amazing creations
                are waiting to be shared.
              </span>

            </div>

          )}

      </div>


      {/* =====================================================
          FULL SCREEN IMAGE MODAL
      ====================================================== */}

      {selectedImage && (

        <div
          onClick={closeImage}
          style={{
            position:
              'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor:
              'rgba(15,23,42,0.78)',
            backdropFilter:
              'blur(8px)',
            display:
              'flex',
            alignItems:
              'center',
            justifyContent:
              'center',
            padding:
              '25px',
            boxSizing:
              'border-box',
          }}
        >

          {/* MODAL */}

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: '100%',
              maxWidth:
                '1000px',
              maxHeight:
                '92vh',
              backgroundColor:
                '#ffffff',
              borderRadius:
                '18px',
              overflow:
                'hidden',
              boxShadow:
                '0 30px 80px rgba(0,0,0,0.35)',
              display:
                'flex',
              flexDirection:
                'column',
            }}
          >

            {/* MODAL HEADER */}

            <div
              style={{
                height:
                  '64px',
                padding:
                  '0 18px 0 20px',
                display:
                  'flex',
                alignItems:
                  'center',
                justifyContent:
                  'space-between',
                borderBottom:
                  '1px solid #e2e8f0',
                boxSizing:
                  'border-box',
                flexShrink: 0,
              }}
            >

              <div>

                <div
                  style={{
                    display:
                      'flex',
                    alignItems:
                      'center',
                    gap: '7px',
                  }}
                >

                  <span
                    style={{
                      fontSize:
                        '9px',
                      fontWeight:
                        700,
                      color:
                        '#ec4899',
                      textTransform:
                        'uppercase',
                    }}
                  >
                    Community Creation
                  </span>

                  <span
                    style={{
                      color:
                        '#cbd5e1',
                    }}
                  >
                    •
                  </span>

                  <span
                    style={{
                      fontSize:
                        '9px',
                      color:
                        '#94a3b8',
                    }}
                  >
                    {formatDate(
                      selectedImage.created_at
                    )}
                  </span>

                </div>


                <h2
                  style={{
                    margin:
                      '3px 0 0',
                    fontSize:
                      '14px',
                    fontWeight:
                      600,
                    color:
                      '#0f172a',
                    maxWidth:
                      '650px',
                    overflow:
                      'hidden',
                    textOverflow:
                      'ellipsis',
                    whiteSpace:
                      'nowrap',
                  }}
                >
                  {selectedImage.prompt ||
                    'AI Generated Image'}
                </h2>

              </div>


              <button
                type="button"
                onClick={
                  closeImage
                }
                title="Close"
                style={{
                  width:
                    '36px',
                  height:
                    '36px',
                  borderRadius:
                    '9px',
                  border:
                    '1px solid #e2e8f0',
                  backgroundColor:
                    '#ffffff',
                  display:
                    'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                  cursor:
                    'pointer',
                }}
              >

                <X
                  size={18}
                  color="#64748b"
                />

              </button>

            </div>


            {/* IMAGE */}

            <div
              style={{
                flex: 1,
                minHeight:
                  '300px',
                maxHeight:
                  'calc(92vh - 130px)',
                overflow:
                  'auto',
                backgroundColor:
                  '#f8fafc',

                backgroundImage: `
                  linear-gradient(45deg, #e2e8f0 25%, transparent 25%),
                  linear-gradient(-45deg, #e2e8f0 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #e2e8f0 75%),
                  linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)
                `,

                backgroundSize:
                  '20px 20px',

                backgroundPosition:
                  '0 0, 0 10px, 10px -10px, -10px 0px',

                display:
                  'flex',
                alignItems:
                  'center',
                justifyContent:
                  'center',
                padding:
                  '20px',
                boxSizing:
                  'border-box',
              }}
            >

              <img
                src={
                  selectedImage.content
                }
                alt={
                  selectedImage.prompt ||
                  'Community creation'
                }
                style={{
                  maxWidth:
                    '100%',
                  maxHeight:
                    'calc(92vh - 180px)',
                  objectFit:
                    'contain',
                  borderRadius:
                    '8px',
                  display:
                    'block',
                  boxShadow:
                    '0 8px 30px rgba(15,23,42,0.15)',
                }}
              />

            </div>


            {/* MODAL FOOTER */}

            <div
              style={{
                minHeight:
                  '66px',
                padding:
                  '0 18px',
                display:
                  'flex',
                alignItems:
                  'center',
                justifyContent:
                  'space-between',
                gap:
                  '12px',
                borderTop:
                  '1px solid #e2e8f0',
                backgroundColor:
                  '#ffffff',
                boxSizing:
                  'border-box',
              }}
            >

              {/* LIKE */}

              <button
                type="button"
                onClick={() =>
                  handleLike(
                    selectedImage
                  )
                }
                disabled={
                  likingId ===
                  selectedImage.id
                }
                style={{
                  height:
                    '36px',
                  padding:
                    '0 12px',
                  borderRadius:
                    '9px',
                  border:
                    isLiked(
                      selectedImage
                    )
                      ? '1px solid #fbcfe8'
                      : '1px solid #e2e8f0',
                  backgroundColor:
                    isLiked(
                      selectedImage
                    )
                      ? '#fdf2f8'
                      : '#ffffff',
                  display:
                    'flex',
                  alignItems:
                    'center',
                  gap:
                    '7px',
                  cursor:
                    'pointer',
                }}
              >

                <Heart
                  size={15}
                  color={
                    isLiked(
                      selectedImage
                    )
                      ? '#ec4899'
                      : '#64748b'
                  }
                  fill={
                    isLiked(
                      selectedImage
                    )
                      ? '#ec4899'
                      : 'none'
                  }
                />

                <span
                  style={{
                    fontSize:
                      '10px',
                    fontWeight:
                      600,
                    color:
                      isLiked(
                        selectedImage
                      )
                        ? '#db2777'
                        : '#64748b',
                  }}
                >
                  {getLikes(
                    selectedImage
                  ).length}{' '}
                  Likes
                </span>

              </button>


              {/* DOWNLOAD */}

              <button
                type="button"
                onClick={() =>
                  handleDownload(
                    selectedImage.content
                  )
                }
                style={{
                  height:
                    '36px',
                  padding:
                    '0 14px',
                  borderRadius:
                    '9px',
                  border:
                    'none',
                  background:
                    'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color:
                    '#ffffff',
                  display:
                    'flex',
                  alignItems:
                    'center',
                  gap:
                    '7px',
                  cursor:
                    'pointer',
                  fontSize:
                    '10px',
                  fontWeight:
                    600,
                }}
              >

                <Download
                  size={14}
                />

                Download

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          RESPONSIVE + ANIMATION
      ====================================================== */}

      <style>
        {`

          @keyframes communityShimmer {
            0% {
              background-position: 200% 0;
            }

            100% {
              background-position: -200% 0;
            }
          }

          @media (max-width: 950px) {

            .community-grid {
              grid-template-columns:
                repeat(2, minmax(0, 1fr)) !important;
            }

          }

          @media (max-width: 650px) {

            .community-grid {
              grid-template-columns:
                1fr !important;
            }

          }

        `}
      </style>

    </div>
  )
}

export default Community