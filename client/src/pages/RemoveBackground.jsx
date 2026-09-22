import React, { useRef, useState } from 'react'
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  Loader2,
  Download,
  Eraser,
  X,
} from 'lucide-react'

const RemoveBackground = () => {
  const fileInputRef = useRef(null)

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
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
  // REMOVE SELECTED FILE
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
  // REMOVE BACKGROUND
  // =====================================================

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!selectedFile) return

    setLoading(true)
    setProcessedImage('')

    // -----------------------------------------------------
    // TEMPORARY DEMO
    // Replace this section with your actual API call.
    // -----------------------------------------------------

    setTimeout(() => {
      // Demo image
      setProcessedImage(previewUrl)

      setLoading(false)

      console.log({
        file: selectedFile,
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
      link.download = 'nexora-background-removed.png'

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
              Remove Background
            </h1>

            <p
              style={{
                margin: '6px 0 0',
                fontSize: '14px',
                color: '#94a3b8',
              }}
            >
              Remove image backgrounds instantly with AI.
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
                color: '#7c3aed',
                fontWeight: 500,
              }}
            >
              Remove Background
            </span>
          </div>
        </div>

        {/* =====================================================
            TWO CARDS
        ====================================================== */}

        <div
          className="remove-background-grid"
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
            {/* Violet top line */}

            <div
              style={{
                height: '4px',
                width: '100%',
                background:
                  'linear-gradient(90deg, #7c3aed, #c084fc)',
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
                      'linear-gradient(135deg, #7c3aed, #a855f7)',
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
                    Background Removal
                  </h2>

                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: '12px',
                      color: '#94a3b8',
                    }}
                  >
                    Upload an image to remove its background
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
                    UPLOAD LABEL
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

                {/* Hidden input */}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleFileChange}
                  style={{
                    display: 'none',
                  }}
                />

                {/* =================================================
                    UPLOAD AREA
                ================================================== */}

                {!selectedFile ? (
                  <button
                    type="button"
                    onClick={handleChooseFile}
                    style={{
                      width: '100%',
                      height: '125px',
                      border: '1px dashed #c4b5fd',
                      borderRadius: '10px',
                      backgroundColor: '#faf9ff',
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
                        backgroundColor: '#ede9fe',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '9px',
                      }}
                    >
                      <Upload
                        size={20}
                        color="#7c3aed"
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
                        marginTop: '4px',
                        fontSize: '10px',
                        color: '#94a3b8',
                      }}
                    >
                      JPG, PNG or WEBP
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
                      border: '1px solid #ddd6fe',
                      borderRadius: '10px',
                      backgroundColor: '#faf9ff',
                      padding: '10px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    {/* Preview */}

                    <div
                      style={{
                        width: '95px',
                        height: '103px',
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

                    {/* File details */}

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
                          border: 'none',
                          background: 'transparent',
                          padding: 0,
                          color: '#7c3aed',
                          fontSize: '10px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Change image
                      </button>
                    </div>

                    {/* Remove */}

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      title="Remove image"
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

                {/* Helper text */}

                <p
                  style={{
                    margin: '7px 0 0',
                    fontSize: '10px',
                    color: '#94a3b8',
                  }}
                >
                  Supports JPG, PNG, WEBP and other common
                  image formats.
                </p>

                {/* =================================================
                    REMOVE BACKGROUND BUTTON
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
                      'linear-gradient(90deg, #7c3aed, #a855f7)',
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
                      '0 3px 8px rgba(124,58,237,0.18)',
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                      Removing Background...
                    </>
                  ) : (
                    <>
                      <Eraser size={15} />
                      Remove Background
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
                  'linear-gradient(90deg, #8b5cf6, #c084fc)',
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
                      backgroundColor: '#f3e8ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Eraser
                      size={21}
                      color="#7c3aed"
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
                      Your background-removed image will
                      appear here
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
                      backgroundColor: '#f3e8ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Sparkles
                      size={27}
                      color="#7c3aed"
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
                    Removing background
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
                      backgroundColor: '#faf7ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ImageIcon
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
                    "Remove Background" to get started.
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
            .remove-background-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 600px) {
            .remove-background-grid {
              gap: 18px !important;
            }
          }
        `}
      </style>
    </div>
  )
}

export default RemoveBackground