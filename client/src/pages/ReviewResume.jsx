import React, { useRef, useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { useAuth } from '@clerk/react'
import {
  FileText,
  Sparkles,
  Upload,
  Loader2,
  Download,
  X,
} from 'lucide-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const ReviewResume = () => {
  const fileInputRef = useRef(null)
  const { getToken } = useAuth()

  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState('')

  // =====================================================
  // SELECT RESUME
  // =====================================================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF resume.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Resume file size must be less than 5MB.')
      return
    }

    setSelectedFile(file)
    setAnalysis('')
  }

  // =====================================================
  // OPEN FILE SELECTOR
  // =====================================================

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  // =====================================================
  // REMOVE SELECTED FILE
  // =====================================================

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setAnalysis('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // =====================================================
  // REVIEW RESUME
  // =====================================================

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!selectedFile) {
      alert('Please upload your resume first.')
      return
    }

    setLoading(true)
    setAnalysis('')

    try {
      const token = await getToken()

      if (!token) {
        throw new Error(
          'Authentication token not found. Please sign in again.'
        )
      }

      const formData = new FormData()

      // Must match upload.single("resume")
      // in your backend route
      formData.append('resume', selectedFile)

      const { data } = await axios.post(
        '/api/ai/resume-review',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!data.success) {
        throw new Error(
          data.message || 'Failed to review resume.'
        )
      }

      if (!data.content) {
        throw new Error(
          'The server returned an empty resume review.'
        )
      }

      setAnalysis(data.content)

    } catch (error) {
      console.error('Resume review error:', error)

      alert(
        error.response?.data?.message ||
          error.message ||
          'Something went wrong while reviewing your resume.'
      )
    } finally {
      setLoading(false)
    }
  }

  // =====================================================
  // DOWNLOAD REVIEW
  // =====================================================

  const handleDownload = () => {
    if (!analysis) return

    try {
      const blob = new Blob([analysis], {
        type: 'text/plain;charset=utf-8',
      })

      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')

      link.href = url
      link.download = 'nexora-resume-review.txt'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)

    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download the resume review.')
    }
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        backgroundColor: '#f5f8fc',
        padding: '32px 40px 50px 60px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1050px',
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
            marginBottom: '26px',
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
              Review Resume
            </h1>

            <p
              style={{
                margin: '6px 0 0',
                fontSize: '14px',
                color: '#94a3b8',
              }}
            >
              Get AI-powered feedback to improve your resume.
            </p>
          </div>

          {/* Breadcrumb */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '12px',
            }}
          >
            <span
              style={{
                color: '#94a3b8',
              }}
            >
              Dashboard
            </span>

            <span
              style={{
                color: '#cbd5e1',
                fontSize: '16px',
              }}
            >
              ›
            </span>

            <span
              style={{
                color: '#0891b2',
                fontWeight: 500,
              }}
            >
              Review Resume
            </span>
          </div>
        </div>

        {/* =====================================================
            TWO CARDS
        ====================================================== */}

        <div
          className="review-resume-grid"
          style={{
            display: 'grid',
            gridTemplateColumns:
              'minmax(0, 1fr) minmax(0, 1fr)',
            gap: '28px',
            width: '100%',
          }}
        >

          {/* ===================================================
              LEFT CARD
          ==================================================== */}

          <div
            style={{
              minHeight: '430px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              boxShadow:
                '0 2px 6px rgba(15, 23, 42, 0.06)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
            }}
          >

            {/* Top gradient */}

            <div
              style={{
                height: '4px',
                width: '100%',
                background:
                  'linear-gradient(90deg, #06b6d4, #3b82f6)',
                flexShrink: 0,
              }}
            />

            <div
              style={{
                padding: '22px 24px 24px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}
            >

              {/* CARD HEADER */}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '22px',
                }}
              >

                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background:
                      'linear-gradient(135deg, #06b6d4, #3b82f6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles
                    size={21}
                    color="#ffffff"
                  />
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#0f172a',
                    }}
                  >
                    Resume Review
                  </h2>

                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: '12px',
                      color: '#94a3b8',
                    }}
                  >
                    Upload your resume for an AI-powered review
                  </p>
                </div>

              </div>

              {/* FORM */}

              <form
                onSubmit={onSubmitHandler}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >

                {/* UPLOAD LABEL */}

                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#334155',
                  }}
                >
                  Upload Resume
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  style={{
                    display: 'none',
                  }}
                />

                {/* =================================================
                    EMPTY UPLOAD
                ================================================== */}

                {!selectedFile ? (

                  <button
                    type="button"
                    onClick={handleChooseFile}
                    style={{
                      width: '100%',
                      height: '125px',
                      border:
                        '1px dashed #a5f3fc',
                      borderRadius: '10px',
                      backgroundColor: '#f7feff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                    }}
                  >

                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '11px',
                        backgroundColor: '#ecfeff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '9px',
                      }}
                    >
                      <Upload
                        size={20}
                        color="#0891b2"
                      />
                    </div>

                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#475569',
                      }}
                    >
                      Click to upload your resume
                    </span>

                    <span
                      style={{
                        marginTop: '4px',
                        fontSize: '10px',
                        color: '#94a3b8',
                      }}
                    >
                      PDF only • Maximum 5MB
                    </span>

                  </button>

                ) : (

                  /* =================================================
                      SELECTED FILE
                  ================================================== */

                  <div
                    style={{
                      width: '100%',
                      height: '125px',
                      border:
                        '1px solid #a5f3fc',
                      borderRadius: '10px',
                      backgroundColor: '#f7feff',
                      padding: '11px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >

                    {/* PDF ICON */}

                    <div
                      style={{
                        width: '62px',
                        height: '82px',
                        borderRadius: '8px',
                        backgroundColor: '#ecfeff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FileText
                        size={29}
                        color="#0891b2"
                      />
                    </div>

                    {/* FILE DETAILS */}

                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >

                      <p
                        style={{
                          margin: 0,
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#334155',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {selectedFile.name}
                      </p>

                      <p
                        style={{
                          margin: '5px 0 0',
                          fontSize: '10px',
                          color: '#94a3b8',
                        }}
                      >
                        {(
                          selectedFile.size /
                          (1024 * 1024)
                        ).toFixed(2)}{' '}
                        MB
                      </p>

                      <button
                        type="button"
                        onClick={handleChooseFile}
                        style={{
                          marginTop: '10px',
                          padding: 0,
                          border: 'none',
                          background: 'transparent',
                          color: '#0891b2',
                          fontSize: '10px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Change resume
                      </button>

                    </div>

                    {/* REMOVE FILE */}

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      title="Remove resume"
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        border:
                          '1px solid #e2e8f0',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      <X
                        size={14}
                        color="#64748b"
                      />
                    </button>

                  </div>
                )}

                {/* HELPER TEXT */}

                <p
                  style={{
                    margin: '7px 0 0',
                    fontSize: '10px',
                    color: '#94a3b8',
                  }}
                >
                  Upload a PDF resume with selectable text. Maximum size: 5MB.
                </p>

                {/* =================================================
                    REVIEW BUTTON
                ================================================== */}

                <button
                  type="submit"
                  disabled={!selectedFile || loading}
                  style={{
                    width: '100%',
                    height: '42px',
                    marginTop: '22px',
                    border: 'none',
                    borderRadius: '9px',
                    background:
                      'linear-gradient(90deg, #06b6d4, #0891b2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor:
                      !selectedFile || loading
                        ? 'not-allowed'
                        : 'pointer',
                    opacity:
                      !selectedFile || loading
                        ? 0.55
                        : 1,
                    boxShadow:
                      '0 3px 8px rgba(8,145,178,0.18)',
                  }}
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                      Reviewing Resume...
                    </>
                  ) : (
                    <>
                      <FileText size={15} />
                      Review Resume
                    </>
                  )}

                </button>

              </form>

            </div>
          </div>

          {/* ===================================================
              RIGHT CARD
          ==================================================== */}

          <div
            style={{
              minHeight: '430px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              boxShadow:
                '0 2px 6px rgba(15, 23, 42, 0.06)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
            }}
          >

            {/* TOP GRADIENT */}

            <div
              style={{
                height: '4px',
                width: '100%',
                background:
                  'linear-gradient(90deg, #22c55e, #06b6d4)',
                flexShrink: 0,
              }}
            />

            {/* =================================================
                RESULTS HEADER
            ================================================== */}

            <div
              style={{
                padding: '22px 24px 18px',
              }}
            >

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >

                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: '#ecfeff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FileText
                      size={21}
                      color="#0891b2"
                    />
                  </div>

                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#0f172a',
                      }}
                    >
                      Analysis Results
                    </h2>

                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Key findings from your resume
                    </p>
                  </div>

                </div>

                {/* DOWNLOAD */}

                {analysis && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    title="Download review"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border:
                        '1px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Download
                      size={14}
                      color="#64748b"
                    />
                  </button>
                )}

              </div>

            </div>

            {/* =================================================
                RESULTS CONTENT
            ================================================== */}

            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: '0 24px 24px',
                boxSizing: 'border-box',
                overflowY: 'auto',
              }}
            >

              {/* =================================================
                  LOADING STATE
              ================================================== */}

              {loading && (
                <div
                  style={{
                    width: '100%',
                    minHeight: '320px',
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
                      backgroundColor: '#ecfeff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Sparkles
                      size={27}
                      color="#0891b2"
                    />
                  </div>

                  <h3
                    style={{
                      margin: '15px 0 0',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#475569',
                    }}
                  >
                    Analyzing your resume
                  </h3>

                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: '11px',
                      color: '#94a3b8',
                    }}
                  >
                    Nexora AI is reviewing your resume...
                  </p>

                </div>
              )}

              {/* =================================================
                  SHORT AI REVIEW
              ================================================== */}

              {!loading && analysis && (
                <div
                  className="resume-analysis"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    borderRadius: '11px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    padding: '20px',
                  }}
                >

                  {/* RESULT HEADER */}

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '18px',
                      paddingBottom: '14px',
                      borderBottom:
                        '1px solid #e2e8f0',
                    }}
                  >

                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '9px',
                        background:
                          'linear-gradient(135deg, #06b6d4, #14b8a6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Sparkles
                        size={18}
                        color="#ffffff"
                      />
                    </div>

                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#0f172a',
                        }}
                      >
                        Resume Summary
                      </h3>

                      <p
                        style={{
                          margin: '3px 0 0',
                          fontSize: '10px',
                          color: '#94a3b8',
                        }}
                      >
                        Key findings from Nexora AI
                      </p>
                    </div>

                  </div>

                  {/* =================================================
                      MARKDOWN CONTENT
                  ================================================== */}

                  <ReactMarkdown
                    components={{

                      h1: ({ children }) => (
                        <h1
                          style={{
                            margin:
                              '18px 0 10px',
                            fontSize: '18px',
                            lineHeight: 1.4,
                            fontWeight: 700,
                            color: '#0f172a',
                          }}
                        >
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <h2
                          style={{
                            margin:
                              '18px 0 9px',
                            fontSize: '16px',
                            lineHeight: 1.4,
                            fontWeight: 700,
                            color: '#0f172a',
                          }}
                        >
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3
                          style={{
                            margin:
                              '17px 0 9px',
                            fontSize: '14px',
                            lineHeight: 1.45,
                            fontWeight: 700,
                            color: '#0891b2',
                          }}
                        >
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p
                          style={{
                            margin:
                              '7px 0',
                            fontSize: '11px',
                            lineHeight: 1.7,
                            color: '#475569',
                          }}
                        >
                          {children}
                        </p>
                      ),

                      strong: ({ children }) => (
                        <strong
                          style={{
                            color: '#0f172a',
                            fontWeight: 700,
                          }}
                        >
                          {children}
                        </strong>
                      ),

                      ul: ({ children }) => (
                        <ul
                          style={{
                            margin:
                              '7px 0 14px',
                            paddingLeft: '20px',
                          }}
                        >
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol
                          style={{
                            margin:
                              '7px 0 14px',
                            paddingLeft: '20px',
                          }}
                        >
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li
                          style={{
                            marginBottom: '6px',
                            paddingLeft: '3px',
                            fontSize: '11px',
                            lineHeight: 1.65,
                            color: '#475569',
                          }}
                        >
                          {children}
                        </li>
                      ),

                      hr: () => (
                        <hr
                          style={{
                            margin:
                              '16px 0',
                            border: 0,
                            borderTop:
                              '1px solid #e2e8f0',
                          }}
                        />
                      ),

                      blockquote: ({ children }) => (
                        <blockquote
                          style={{
                            margin:
                              '12px 0',
                            padding:
                              '10px 14px',
                            borderLeft:
                              '3px solid #06b6d4',
                            backgroundColor:
                              '#ecfeff',
                            borderRadius:
                              '0 7px 7px 0',
                          }}
                        >
                          {children}
                        </blockquote>
                      ),

                      code: ({ children }) => (
                        <code
                          style={{
                            padding:
                              '2px 5px',
                            borderRadius: '4px',
                            backgroundColor:
                              '#e2e8f0',
                            color: '#0f172a',
                            fontSize: '10px',
                          }}
                        >
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {analysis}
                  </ReactMarkdown>

                </div>
              )}

              {/* =================================================
                  EMPTY STATE
              ================================================== */}

              {!loading && !analysis && (
                <div
                  style={{
                    width: '100%',
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >

                  <div
                    style={{
                      width: '62px',
                      height: '62px',
                      borderRadius: '50%',
                      backgroundColor: '#f0fdfa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FileText
                      size={30}
                      color="#99f6e4"
                    />
                  </div>

                  <h3
                    style={{
                      margin: '16px 0 0',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#475569',
                    }}
                  >
                    No analysis available yet
                  </h3>

                  <p
                    style={{
                      margin: '7px 0 0',
                      maxWidth: '290px',
                      fontSize: '11px',
                      lineHeight: 1.6,
                      color: '#94a3b8',
                    }}
                  >
                    Upload your PDF resume and click
                    "Review Resume" to get started.
                  </p>

                </div>
              )}

            </div>
          </div>

        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div
          style={{
            textAlign: 'center',
            marginTop: '30px',
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
          RESPONSIVE CSS
      ====================================================== */}

      <style>
        {`
          @media (max-width: 900px) {
            .review-resume-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 600px) {
            .review-resume-grid {
              gap: 18px !important;
            }
          }

          .resume-analysis ul li::marker {
            color: #06b6d4;
          }

          .resume-analysis ol li::marker {
            color: #0891b2;
            font-weight: 600;
          }
        `}
      </style>

    </div>
  )
}

export default ReviewResume