import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/react'
import {
  Gem,
  Sparkles,
  FileText,
  Image,
  PenLine,
  Hash,
  Loader2,
  RefreshCw,
  Trash2,
} from 'lucide-react'
import CreationItem from '../components/CreationItem'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Dashboard = () => {

  const { getToken } = useAuth()

  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingAll, setDeletingAll] = useState(false)
  const [error, setError] = useState('')

  // =====================================================
  // GET DASHBOARD DATA
  // =====================================================

  const getDashboardData = async () => {

    try {

      setLoading(true)
      setError('')

      const token = await getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please sign in again.'
        )
      }

      const { data } = await axios.get(
        '/api/user/get-user-creations',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!data.success) {
        throw new Error(
          data.message ||
            'Failed to load dashboard data.'
        )
      }

      setCreations(data.creations || [])

    } catch (error) {

      console.error(
        'Dashboard error:',
        error
      )

      setError(
        error.response?.data?.message ||
          error.message ||
          'Failed to load your creations.'
      )

      setCreations([])

    } finally {

      setLoading(false)

    }
  }

  // =====================================================
  // DELETE ONE CREATION FROM UI
  // =====================================================

  const handleCreationDeleted = (deletedId) => {

    setCreations((currentCreations) =>
      currentCreations.filter(
        (item) => item.id !== deletedId
      )
    )

  }

  // =====================================================
  // DELETE ALL CREATIONS
  // =====================================================

  const handleDeleteAll = async () => {

    if (creations.length === 0) {
      return
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete all ${creations.length} creations?\n\nThis action cannot be undone.`
    )

    if (!confirmed) {
      return
    }

    try {

      setDeletingAll(true)

      const token = await getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please sign in again.'
        )
      }

      const { data } = await axios.delete(
        '/api/user/delete-all-creations',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!data.success) {
        throw new Error(
          data.message ||
            'Failed to delete all creations.'
        )
      }

      // Clear dashboard immediately
      setCreations([])

      alert(
        `${data.deletedCount || 0} creations deleted successfully.`
      )

    } catch (error) {

      console.error(
        'Delete all creations error:',
        error
      )

      alert(
        error.response?.data?.message ||
          error.message ||
          'Failed to delete all creations.'
      )

    } finally {

      setDeletingAll(false)

    }
  }

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    getDashboardData()
  }, [])

  // =====================================================
  // COUNTS
  // =====================================================

  const imageCount = creations.filter(
    (item) => item.type === 'image'
  ).length

  const articleCount = creations.filter(
    (item) => item.type === 'article'
  ).length

  const blogTitleCount = creations.filter(
    (item) => item.type === 'blog-title'
  ).length

  const resumeCount = creations.filter(
    (item) => item.type === 'resume-review'
  ).length

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        backgroundColor: '#f5f8fc',
        padding: '32px 40px 60px 60px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >

      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '28px',
          }}
        >

          <div>

            <h1
              style={{
                margin: 0,
                fontSize: '26px',
                lineHeight: 1.2,
                fontWeight: 600,
                color: '#0f172a',
              }}
            >
              Dashboard
            </h1>

            <p
              style={{
                margin: '6px 0 0',
                fontSize: '14px',
                color: '#94a3b8',
              }}
            >
              Manage and view your latest AI creations.
            </p>

          </div>

          {/* REFRESH */}

          <button
            type="button"
            onClick={getDashboardData}
            disabled={loading || deletingAll}
            title="Refresh dashboard"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '9px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor:
                loading || deletingAll
                  ? 'not-allowed'
                  : 'pointer',
              opacity:
                loading || deletingAll
                  ? 0.6
                  : 1,
            }}
          >

            <RefreshCw
              size={15}
              color="#64748b"
              className={
                loading
                  ? 'animate-spin'
                  : ''
              }
            />

          </button>

        </div>


        {/* =====================================================
            TOP CARDS
        ====================================================== */}

        <div
          className="dashboard-top-cards"
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(2, minmax(0, 290px))',
            gap: '28px',
          }}
        >

          {/* TOTAL CREATIONS */}

          <div
            style={{
              height: '150px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              boxShadow:
                '0 2px 5px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >

            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#e0e7ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}
            >

              <Sparkles
                size={21}
                color="#4f46e5"
              />

            </div>

            <p
              style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: 500,
                color: '#64748b',
              }}
            >
              Total Creations
            </p>

            <h2
              style={{
                margin: '4px 0 0',
                fontSize: '26px',
                fontWeight: 600,
                color: '#0f172a',
              }}
            >
              {loading
                ? '—'
                : creations.length}
            </h2>

          </div>


          {/* ACTIVE PLAN */}

          <div
            style={{
              height: '150px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              boxShadow:
                '0 2px 5px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >

            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background:
                  'linear-gradient(135deg, #ff61c5, #9e53ee)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}
            >

              <Gem
                size={21}
                color="#ffffff"
              />

            </div>

            <p
              style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: 500,
                color: '#64748b',
              }}
            >
              Active Plan
            </p>

            <h2
              style={{
                margin: '4px 0 0',
                fontSize: '26px',
                fontWeight: 600,
                color: '#0f172a',
              }}
            >
              Premium
            </h2>

          </div>

        </div>


        {/* =====================================================
            TYPE SUMMARY
        ====================================================== */}

        {!loading &&
          creations.length > 0 && (

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginTop: '22px',
              }}
            >

              {imageCount > 0 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '7px 11px',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    border:
                      '1px solid #e2e8f0',
                    fontSize: '11px',
                    color: '#64748b',
                  }}
                >
                  <Image
                    size={13}
                    color="#ec4899"
                  />

                  {imageCount}{' '}
                  {imageCount === 1
                    ? 'Image'
                    : 'Images'}
                </div>
              )}

              {articleCount > 0 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '7px 11px',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    border:
                      '1px solid #e2e8f0',
                    fontSize: '11px',
                    color: '#64748b',
                  }}
                >
                  <PenLine
                    size={13}
                    color="#f97316"
                  />

                  {articleCount}{' '}
                  {articleCount === 1
                    ? 'Article'
                    : 'Articles'}
                </div>
              )}

              {blogTitleCount > 0 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '7px 11px',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    border:
                      '1px solid #e2e8f0',
                    fontSize: '11px',
                    color: '#64748b',
                  }}
                >
                  <Hash
                    size={13}
                    color="#16a34a"
                  />

                  {blogTitleCount}{' '}
                  {blogTitleCount === 1
                    ? 'Blog Title'
                    : 'Blog Titles'}
                </div>
              )}

              {resumeCount > 0 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '7px 11px',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    border:
                      '1px solid #e2e8f0',
                    fontSize: '11px',
                    color: '#64748b',
                  }}
                >
                  <FileText
                    size={13}
                    color="#0891b2"
                  />

                  {resumeCount}{' '}
                  {resumeCount === 1
                    ? 'Resume Review'
                    : 'Resume Reviews'}
                </div>
              )}

            </div>
          )}


        {/* =====================================================
            RECENT CREATIONS
        ====================================================== */}

        <div
          style={{
            marginTop: '48px',
            width: '100%',
          }}
        >

          {/* =================================================
              HEADER
          ================================================== */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              gap: '20px',
            }}
          >

            <div>

              <h2
                style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#1e293b',
                }}
              >
                Recent Creations
              </h2>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: '13px',
                  color: '#94a3b8',
                }}
              >
                Your latest AI generated content
              </p>

            </div>


            {/* =================================================
                RIGHT SIDE CONTROLS
            ================================================== */}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexShrink: 0,
              }}
            >

              {/* DELETE ALL */}

              {creations.length > 0 && (

                <button
                  type="button"
                  onClick={handleDeleteAll}
                  disabled={deletingAll}
                  style={{
                    height: '34px',
                    padding: '0 13px',
                    borderRadius: '8px',
                    border:
                      '1px solid #fecaca',
                    backgroundColor:
                      '#fff1f2',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: deletingAll
                      ? 'not-allowed'
                      : 'pointer',
                    opacity: deletingAll
                      ? 0.65
                      : 1,
                    whiteSpace: 'nowrap',
                  }}
                >

                  {deletingAll ? (

                    <Loader2
                      size={14}
                      className="animate-spin"
                    />

                  ) : (

                    <Trash2
                      size={14}
                    />

                  )}

                  {deletingAll
                    ? 'Deleting...'
                    : 'Delete All'}

                </button>

              )}


              {/* ITEM COUNT */}

              <span
                style={{
                  height: '34px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: '#64748b',
                  backgroundColor: '#ffffff',
                  border:
                    '1px solid #e2e8f0',
                  padding: '0 12px',
                  borderRadius: '999px',
                  whiteSpace: 'nowrap',
                }}
              >
                {loading
                  ? 'Loading...'
                  : `${creations.length} ${
                      creations.length === 1
                        ? 'item'
                        : 'items'
                    }`}
              </span>

            </div>

          </div>


          {/* =================================================
              LOADING
          ================================================== */}

          {loading && (

            <div
              style={{
                width: '100%',
                minHeight: '230px',
                backgroundColor: '#ffffff',
                border:
                  '1px solid #e2e8f0',
                borderRadius: '14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >

              <Loader2
                size={27}
                color="#4f46e5"
                className="animate-spin"
              />

              <h3
                style={{
                  margin: '13px 0 0',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#475569',
                }}
              >
                Loading your creations
              </h3>

            </div>

          )}


          {/* =================================================
              ERROR
          ================================================== */}

          {!loading &&
            error && (

              <div
                style={{
                  width: '100%',
                  minHeight: '200px',
                  backgroundColor: '#ffffff',
                  border:
                    '1px solid #fecaca',
                  borderRadius: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '30px',
                  boxSizing: 'border-box',
                }}
              >

                <h3
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#475569',
                  }}
                >
                  Unable to load creations
                </h3>

                <p
                  style={{
                    margin: '6px 0 0',
                    maxWidth: '420px',
                    fontSize: '11px',
                    color: '#94a3b8',
                  }}
                >
                  {error}
                </p>

                <button
                  type="button"
                  onClick={getDashboardData}
                  style={{
                    marginTop: '14px',
                    height: '34px',
                    padding: '0 15px',
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
              EMPTY STATE
          ================================================== */}

          {!loading &&
            !error &&
            creations.length === 0 && (

              <div
                style={{
                  width: '100%',
                  minHeight: '240px',
                  backgroundColor: '#ffffff',
                  border:
                    '1px solid #e2e8f0',
                  borderRadius: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >

                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor:
                      '#eef2ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >

                  <Sparkles
                    size={28}
                    color="#a5b4fc"
                  />

                </div>

                <h3
                  style={{
                    margin: '15px 0 0',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#475569',
                  }}
                >
                  No creations yet
                </h3>

                <p
                  style={{
                    margin: '6px 0 0',
                    maxWidth: '350px',
                    fontSize: '11px',
                    lineHeight: 1.6,
                    color: '#94a3b8',
                  }}
                >
                  Start using Nexora AI tools and your
                  generated content will appear here.
                </p>

              </div>

            )}


          {/* =================================================
              CREATION LIST
          ================================================== */}

          {!loading &&
            !error &&
            creations.length > 0 && (

              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >

                {creations.map((item) => (

                  <CreationItem
                    key={item.id}
                    item={item}
                    onDeleted={
                      handleCreationDeleted
                    }
                  />

                ))}

              </div>

            )}

        </div>


        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div
          style={{
            textAlign: 'center',
            marginTop: '40px',
          }}
        >

          <p
            style={{
              margin: 0,
              fontSize: '11px',
              color: '#94a3b8',
            }}
          >
            © 2026 Nexora.ai. All rights reserved.
          </p>

        </div>

      </div>


      {/* =====================================================
          RESPONSIVE
      ====================================================== */}

      <style>
        {`
          @media (max-width: 800px) {
            .dashboard-top-cards {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 600px) {
            .dashboard-top-cards {
              width: 100%;
            }
          }
        `}
      </style>

    </div>
  )
}

export default Dashboard