import React, { useRef, useState } from 'react'
import {
  Scissors,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Loader2,
  Download,
  X,
} from 'lucide-react'

const RemoveObject = () => {
  const fileInputRef = useRef(null)

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [objectName, setObjectName] = useState('')
  const [processedImage, setProcessedImage] = useState('')
  const [loading, setLoading] = useState(false)

  // =====================================================
  // SELECT IMAGE
  // =====================================================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.')
      return
    }

    setSelectedFile(file)
    setProcessedImage('')

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  // =====================================================
  // OPEN FILE SELECTOR
  // =====================================================

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    setProcessedImage('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // =====================================================
  // REMOVE OBJECT
  // =====================================================

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!selectedFile) {
      alert('Please upload an image first.')
      return
    }

    if (!objectName.trim()) {
      alert('Please describe the object you want to remove.')
      return
    }

    setLoading(true)
    setProcessedImage('')

    // -----------------------------------------------------
    // TEMPORARY DEMO
    // Replace this with your actual backend/API call.
    // -----------------------------------------------------

    setTimeout(() => {
      setProcessedImage(previewUrl)

      setLoading(false)

      console.log({
        file: selectedFile,
        objectName,
      })
    }, 1500)
  }

  // =====================================================
  // DOWNLOAD IMAGE
  // =====================================================

  const handleDownload = async () => {
    if (!processedImage) return

    try {
      const response = await fetch(processedImage)
      const blob = await response.blob()

      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')

      link.href = url
      link.download = 'nexora-object-removed.png'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
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
              Remove Object
            </h1>

            <p
              style={{
                margin: '6px 0 0',
                fontSize: '14px',
                color: '#94a3b8',
              }}
            >
              Remove unwanted objects from your images with AI.
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
                color: '#4f46e5',
                fontWeight: 500,
              }}
            >
              Remove Object
            </span>
          </div>
        </div>

        {/* =====================================================
            TWO CARDS
        ====================================================== */}

        <div
          className="remove-object-grid"
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

            {/* Blue → Violet top line */}

            <div
              style={{
                height: '4px',
                width: '100%',
                background:
                  'linear-gradient(90deg, #3b82f6, #8b5cf6)',
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

              {/* =================================================
                  CARD HEADER
              ================================================== */}

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
                      'linear-gradient(135deg, #3b82f6, #8b5cf6)',
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
                    Object Removal
                  </h2>

                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: '12px',
                      color: '#94a3b8',
                    }}
                  >
                    Upload an image and tell AI what to remove
                  </p>
                </div>

              </div>

              {/* =================================================
                  FORM
              ================================================== */}

              <form
                onSubmit={onSubmitHandler}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >

                {/* =================================================
                    UPLOAD
                ================================================== */}

                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#334155',
                  }}
                >
                  Upload Image
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleFileChange}
                  style={{
                    display: 'none',
                  }}
                />

                {!selectedFile ? (

                  <button
                    type="button"
                    onClick={handleChooseFile}
                    style={{
                      width: '100%',
                      height: '105px',
                      border:
                        '1px dashed #c7d2fe',
                      borderRadius: '10px',
                      backgroundColor: '#f8f9ff',
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
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: '#eef2ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '8px',
                      }}
                    >
                      <Upload
                        size={19}
                        color="#4f46e5"
                      />
                    </div>

                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#475569',
                      }}
                    >
                      Click to upload an image
                    </span>

                    <span
                      style={{
                        marginTop: '3px',
                        fontSize: '10px',
                        color: '#94a3b8',
                      }}
                    >
                      JPG, PNG or WEBP
                    </span>

                  </button>

                ) : (

                  <div
                    style={{
                      width: '100%',
                      height: '105px',
                      border:
                        '1px solid #c7d2fe',
                      borderRadius: '10px',
                      backgroundColor: '#f8f9ff',
                      padding: '9px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '11px',
                    }}
                  >

                    <div
                      style={{
                        width: '80px',
                        height: '87px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: '#f1f5f9',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={previewUrl}
                        alt="Selected"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: '11px',
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
                          margin: '4px 0 0',
                          fontSize: '9px',
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
                          marginTop: '7px',
                          padding: 0,
                          border: 'none',
                          background: 'transparent',
                          color: '#4f46e5',
                          fontSize: '10px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Change image
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      title="Remove image"
                      style={{
                        width: '27px',
                        height: '27px',
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
                        size={13}
                        color="#64748b"
                      />
                    </button>

                  </div>
                )}

                {/* =================================================
                    OBJECT DESCRIPTION
                ================================================== */}

                <div
                  style={{
                    marginTop: '20px',
                  }}
                >

                  <label
                    htmlFor="object-name"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#334155',
                    }}
                  >
                    Describe Object to Remove
                  </label>

                  <textarea
                    id="object-name"
                    value={objectName}
                    onChange={(e) =>
                      setObjectName(e.target.value)
                    }
                    placeholder="e.g., watch or spoon. Only describe one object"
                    rows={3}
                    style={{
                      width: '100%',
                      minHeight: '82px',
                      resize: 'vertical',
                      padding: '11px 13px',
                      boxSizing: 'border-box',
                      border:
                        '1px solid #d8e0ea',
                      borderRadius: '9px',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#1e293b',
                      fontSize: '11px',
                      lineHeight: 1.5,
                      fontFamily: 'inherit',
                    }}
                  />

                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: '10px',
                      color: '#94a3b8',
                    }}
                  >
                    Describe only the object you want AI to
                    remove.
                  </p>

                </div>

                {/* =================================================
                    BUTTON
                ================================================== */}

                <button
                  type="submit"
                  disabled={
                    !selectedFile ||
                    !objectName.trim() ||
                    loading
                  }
                  style={{
                    width: '100%',
                    height: '42px',
                    marginTop: '20px',
                    border: 'none',
                    borderRadius: '9px',
                    background:
                      'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor:
                      !selectedFile ||
                      !objectName.trim() ||
                      loading
                        ? 'not-allowed'
                        : 'pointer',
                    opacity:
                      !selectedFile ||
                      !objectName.trim() ||
                      loading
                        ? 0.55
                        : 1,
                    boxShadow:
                      '0 3px 8px rgba(79,70,229,0.18)',
                  }}
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                      Removing Object...
                    </>
                  ) : (
                    <>
                      <Scissors size={15} />
                      Remove Object
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

            {/* Violet top line */}

            <div
              style={{
                height: '4px',
                width: '100%',
                background:
                  'linear-gradient(90deg, #6366f1, #a855f7)',
                flexShrink: 0,
              }}
            />

            {/* =================================================
                HEADER
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
                      backgroundColor: '#eef2ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Scissors
                      size={21}
                      color="#4f46e5"
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
                      Processed Image
                    </h2>

                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Your processed image will appear here
                    </p>
                  </div>

                </div>

                {/* Download */}

                {processedImage && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    title="Download image"
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
                IMAGE AREA
            ================================================== */}

            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: '0 24px 24px',
                boxSizing: 'border-box',
              }}
            >

              {/* =================================================
                  LOADING
              ================================================== */}

              {loading && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
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
                      backgroundColor: '#eef2ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Sparkles
                      size={27}
                      color="#4f46e5"
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
                    Removing object
                  </h3>

                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: '11px',
                      color: '#94a3b8',
                    }}
                  >
                    Nexora AI is processing your image...
                  </p>

                </div>
              )}

              {/* =================================================
                  PROCESSED IMAGE
              ================================================== */}

              {!loading && processedImage && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}
                >

                  <img
                    src={processedImage}
                    alt="Processed"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      borderRadius: '8px',
                    }}
                  />

                </div>
              )}

              {/* =================================================
                  EMPTY STATE
              ================================================== */}

              {!loading && !processedImage && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
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
                      backgroundColor: '#f5f3ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Scissors
                      size={30}
                      color="#c4b5fd"
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
                    No image processed yet
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
                    Upload an image and click
                    "Remove Object" to get started.
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
            .remove-object-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 600px) {
            .remove-object-grid {
              gap: 18px !important;
            }
          }
        `}
      </style>
    </div>
  )
}

export default RemoveObject