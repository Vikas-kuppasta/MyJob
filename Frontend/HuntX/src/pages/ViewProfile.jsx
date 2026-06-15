import { APPLICATION_API_END_POINT } from "@/constants/constant";
import { setApplicantProfile } from "@/redux/getApplication";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

/* ─── helpers ─────────────────────────────────────────── */
const fmtDate = (d) => {
  if (!d) return "Present";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/* ─── tokens ───────────────────────────────────────────── */
const ACCENT        = "#6366f1";
const ACCENT_LIGHT  = "#eef2ff";
const ACCENT_MID    = "#c7d2fe";
const TEXT_PRIMARY  = "#0f172a";
const TEXT_SEC      = "#475569";
const TEXT_MUTED    = "#94a3b8";
const SURFACE       = "#ffffff";
const PAGE_BG       = "#f1f5f9";
const BORDER        = "#e2e8f0";
const GREEN_BG      = "#ecfdf5";
const GREEN_BORDER  = "#a7f3d0";
const GREEN_ICON    = "#10b981";

/* ─── tiny sub-components ─────────────────────────────── */
const SectionHeading = ({ children }) => (
  <p style={{
    fontSize: 10, fontWeight: 700, letterSpacing: 1.1,
    textTransform: "uppercase", color: ACCENT, margin: "0 0 14px",
  }}>
    {children}
  </p>
);

const Divider = () => (
  <div style={{ height: 1, background: BORDER, margin: "18px 0" }} />
);

const EmptyNote = ({ text }) => (
  <p style={{ fontSize: 13, color: TEXT_MUTED, fontStyle: "italic", margin: 0 }}>{text}</p>
);

const Section = ({ label, children }) => (
  <div style={{
    background: SURFACE, border: `1px solid ${BORDER}`,
    borderRadius: 14, padding: 22, marginBottom: 16,
  }}>
    <SectionHeading>{label}</SectionHeading>
    {children}
  </div>
);

/* ─── SVG icons (no external deps) ────────────────────── */
const Icon = ({ size = 16, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"
    strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
    {children}
  </svg>
);

const MailIcon    = () => <Icon size={14}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></Icon>;
const PhoneIcon   = () => <Icon size={14}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.66A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z"/></Icon>;
const PinIcon     = () => <Icon size={14}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></Icon>;
const GithubIcon  = ({ size = 14 }) => <Icon size={size}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></Icon>;
const LinkedinIcon = () => <Icon size={14}><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></Icon>;
const GlobeIcon   = () => <Icon size={14}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></Icon>;
const FileIcon    = () => <Icon size={20}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></Icon>;
const ExtIcon     = ({ size = 14 }) => <Icon size={size}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Icon>;
const GradIcon    = () => <Icon size={18}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></Icon>;
const DownloadIcon = () => <Icon size={15}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></Icon>;

/* ─── main component ──────────────────────────────────── */
const ViewProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/profile`,
          { withCredentials: true }
        );
        if (res.data.success) dispatch(setApplicantProfile(res.data.applicant));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const { applicantProfile } = useSelector((store) => store.application);

  if (!applicantProfile) {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", minHeight:"70vh", gap:14, fontFamily:"Inter,system-ui,sans-serif" }}>
        <div style={{ width:40, height:40, border:`3px solid ${BORDER}`,
          borderTopColor:ACCENT, borderRadius:"50%", animation:"vpSpin 0.75s linear infinite" }} />
        <span style={{ fontSize:14, color:TEXT_MUTED }}>Loading profile…</span>
        <style>{`@keyframes vpSpin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* destructure — only schema fields */
  const {
    firstname,
    email,
    role,
    profile: {
      bio,
      skills = [],
      profilePhoto  = "",
      profileBanner = "",
      resume,
      resumeOriginalname,
      phone,
      location,
      github,
      linkedin,
      portfolio,
      education  = [],
      experience = [],
      projects   = [],
    } = {},
  } = applicantProfile;

  const hasLinks = github || linkedin || portfolio;

  return (
    <div style={{ fontFamily:"'Inter',system-ui,-apple-system,sans-serif",
      background:PAGE_BG, minHeight:"100vh", paddingBottom:56 }}>

      {/* global responsive rules */}
      <style>{`
        @keyframes vpSpin { to { transform:rotate(360deg); } }

        .vp-outer   { max-width:980px; margin:0 auto; padding:0 20px; }
        .vp-grid    { display:grid; grid-template-columns:260px 1fr; gap:20px; align-items:start; }
        .vp-chip-row{ display:flex; flex-wrap:wrap; gap:10px; margin-bottom:14px; }
        .vp-link-row{ display:flex; flex-wrap:wrap; gap:8px; }
        .vp-proj-hd { display:flex; justify-content:space-between; align-items:flex-start;
                      margin-bottom:6px; gap:8px; }

        /* ── tablet ── */
        @media (max-width:768px) {
          .vp-grid { grid-template-columns:1fr; }
          .vp-profile-card { padding:18px !important; }
          .vp-name  { font-size:22px !important; }
        }

        /* ── mobile ── */
        @media (max-width:520px) {
          .vp-outer { padding:0 12px; }
          .vp-banner { height:140px !important; }
          .vp-avatar-wrap { width:76px !important; height:76px !important;
                            margin-top:-48px !important; }
          .vp-initials { font-size:22px !important; }
          .vp-avatar-row { flex-wrap:wrap; gap:10px; }
          .vp-chip-row { flex-direction:column; gap:7px; }
          .vp-resume-btn { font-size:12px !important; padding:7px 13px !important; }
          .vp-proj-hd { flex-direction:column; }
        }
      `}</style>

      {/* ── Banner ── */}
      <div className="vp-banner" style={{ width:"100%", height:200, overflow:"hidden", flexShrink:0 }}>
        {profileBanner
          ? <img src={profileBanner} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center" }} />
          : <div style={{ width:"100%", height:"100%",
              background:"linear-gradient(135deg,#1e1b4b 0%,#3730a3 45%,#6366f1 80%,#818cf8 100%)" }} />
        }
      </div>

      <div className="vp-outer">

        {/* ── Profile card ── */}
        <div className="vp-profile-card" style={{
          background:SURFACE, border:`1px solid ${BORDER}`, borderRadius:16,
          padding:28, marginTop:-52, position:"relative", zIndex:1, marginBottom:20,
        }}>
          {/* avatar + resume button */}
          <div className="vp-avatar-row" style={{ display:"flex", alignItems:"flex-end",
            justifyContent:"space-between", marginBottom:16 }}>

            <div className="vp-avatar-wrap" style={{
              width:96, height:96, borderRadius:"50%",
              border:`3px solid ${SURFACE}`, outline:`3px solid ${ACCENT_MID}`,
              background:ACCENT_LIGHT, display:"flex", alignItems:"center",
              justifyContent:"center", overflow:"hidden", flexShrink:0,
              marginTop:-64, boxShadow:"0 4px 20px rgba(99,102,241,0.18)",
            }}>
              {profilePhoto
                ? <img src={profilePhoto} alt={firstname}
                    style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                : <span className="vp-initials"
                    style={{ fontSize:28, fontWeight:700, color:ACCENT, letterSpacing:-0.5 }}>
                    {getInitials(firstname)}
                  </span>
              }
            </div>

            {resume && (
              <a href={resume} target="_blank" rel="noreferrer"
                className="vp-resume-btn"
                style={{
                  display:"inline-flex", alignItems:"center", gap:7,
                  background:ACCENT, color:"#fff", textDecoration:"none",
                  fontSize:13, fontWeight:600, padding:"9px 18px",
                  borderRadius:8, letterSpacing:0.2,
                }}>
                <DownloadIcon /> View Resume
              </a>
            )}
          </div>

          {/* name */}
          <h1 className="vp-name" style={{
            fontSize:26, fontWeight:700, color:TEXT_PRIMARY,
            margin:"0 0 6px", letterSpacing:-0.5, lineHeight:1.2,
          }}>
            {firstname}
          </h1>

          {/* role badge */}
          {role && (
            <span style={{
              display:"inline-block", fontSize:11, fontWeight:600,
              textTransform:"uppercase", letterSpacing:0.8,
              padding:"3px 10px", borderRadius:20,
              background:ACCENT_LIGHT, color:ACCENT,
              border:`1px solid ${ACCENT_MID}`, marginBottom:10,
            }}>
              {role}
            </span>
          )}

          {/* bio */}
          {bio && (
            <p style={{ fontSize:14, color:TEXT_SEC, lineHeight:1.65,
              margin:"8px 0 0", maxWidth:640 }}>
              {bio}
            </p>
          )}

          <Divider />

          {/* contact chips */}
          <div className="vp-chip-row">
            {email && (
              <a href={`mailto:${email}`} style={chipStyle}>
                <MailIcon /> {email}
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} style={chipStyle}>
                <PhoneIcon /> {phone}
              </a>
            )}
            {location && (
              <span style={chipStyle}>
                <PinIcon /> {location}
              </span>
            )}
          </div>

          {/* external links */}
          {hasLinks && (
            <div className="vp-link-row">
              {github   && <LinkPill href={github}   label="GitHub"    icon={<GithubIcon />} />}
              {linkedin && <LinkPill href={linkedin}  label="LinkedIn"  icon={<LinkedinIcon />} />}
              {portfolio && <LinkPill href={portfolio} label="Portfolio" icon={<GlobeIcon />} />}
            </div>
          )}
        </div>

        {/* ── Main grid ── */}
        <div className="vp-grid">

          {/* LEFT */}
          <div>
            {/* Skills */}
            <Section label="Skills">
              {skills.length
                ? <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                    {skills.map((sk, i) => (
                      <span key={i} style={{
                        fontSize:12, fontWeight:500, padding:"5px 12px",
                        borderRadius:20, background:ACCENT_LIGHT,
                        color:"#4338ca", border:`1px solid ${ACCENT_MID}`,
                      }}>{sk}</span>
                    ))}
                  </div>
                : <EmptyNote text="No skills added yet." />
              }
            </Section>

            {/* Resume */}
            <Section label="Resume">
              {resume
                ? <a href={resume} target="_blank" rel="noreferrer" style={{
                    display:"flex", alignItems:"center", gap:12,
                    padding:"12px 14px", background:"#f8fafc",
                    border:`1px solid ${BORDER}`, borderRadius:10,
                    textDecoration:"none", color:TEXT_PRIMARY,
                  }}>
                    <div style={{
                      width:40, height:40, borderRadius:10, background:ACCENT_LIGHT,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      flexShrink:0, color:ACCENT,
                    }}>
                      <FileIcon />
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontSize:13, fontWeight:600, color:TEXT_PRIMARY,
                        margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {resumeOriginalname || "Resume.pdf"}
                      </p>
                      <p style={{ fontSize:11, color:TEXT_MUTED, margin:"2px 0 0" }}>
                        PDF · Click to open
                      </p>
                    </div>
                    <span style={{ color:ACCENT, flexShrink:0 }}><ExtIcon /></span>
                  </a>
                : <EmptyNote text="No resume uploaded." />
              }
            </Section>
          </div>

          {/* RIGHT */}
          <div>
            {/* Experience */}
            <Section label="Experience">
              {experience.length
                ? experience.map((exp, i) => (
                    <div key={i} style={{ display:"flex", gap:14, marginBottom:4 }}>
                      {/* dot + track */}
                      <div style={{ display:"flex", flexDirection:"column",
                        alignItems:"center", width:16, flexShrink:0 }}>
                        <div style={{
                          width:12, height:12, borderRadius:"50%",
                          background:ACCENT, border:`2px solid ${ACCENT_LIGHT}`,
                          flexShrink:0, marginTop:4,
                        }} />
                        {i < experience.length - 1 && (
                          <div style={{ width:2, flex:1, background:ACCENT_MID,
                            margin:"5px 0", minHeight:24 }} />
                        )}
                      </div>
                      {/* content */}
                      <div style={{ paddingBottom: i < experience.length - 1 ? 20 : 0, flex:1 }}>
                        <p style={{ fontSize:14, fontWeight:600, color:TEXT_PRIMARY, margin:"0 0 2px" }}>
                          {exp.position}
                        </p>
                        <p style={{ fontSize:13, color:ACCENT, fontWeight:500, margin:"0 0 3px" }}>
                          {exp.company}
                        </p>
                        <p style={{ fontSize:11.5, color:TEXT_MUTED, margin:"0 0 6px" }}>
                          {fmtDate(exp.startDate)} — {fmtDate(exp.endDate)}
                        </p>
                        {exp.description && (
                          <p style={{ fontSize:13, color:TEXT_SEC, lineHeight:1.6, margin:0 }}>
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                : <EmptyNote text="No experience listed." />
              }
            </Section>

            {/* Education */}
            <Section label="Education">
              {education.length
                ? <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    {education.map((edu, i) => (
                      <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                        <div style={{
                          width:40, height:40, borderRadius:10,
                          background:GREEN_BG, border:`1px solid ${GREEN_BORDER}`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          flexShrink:0, color:GREEN_ICON,
                        }}>
                          <GradIcon />
                        </div>
                        <div>
                          <p style={{ fontSize:14, fontWeight:600, color:TEXT_PRIMARY, margin:"0 0 2px" }}>
                            {edu.degree}{edu.field ? ` · ${edu.field}` : ""}
                          </p>
                          <p style={{ fontSize:13, color:TEXT_SEC, fontWeight:500, margin:"0 0 3px" }}>
                            {edu.college}
                          </p>
                          <p style={{ fontSize:11.5, color:TEXT_MUTED, margin:0 }}>
                            {edu.startYear} — {edu.endYear || "Present"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                : <EmptyNote text="No education listed." />
              }
            </Section>

            {/* Projects */}
            <Section label="Projects">
              {projects.length
                ? <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    {projects.map((proj, i) => (
                      <div key={i} style={{
                        border:`1px solid ${BORDER}`, borderRadius:12,
                        padding:"14px 16px", background:"#f8fafc",
                      }}>
                        <div className="vp-proj-hd">
                          <p style={{ fontSize:14, fontWeight:700, color:TEXT_PRIMARY, margin:0 }}>
                            {proj.title}
                          </p>
                          <div style={{ display:"flex", gap:12, flexShrink:0 }}>
                            {proj.liveLink && (
                              <a href={proj.liveLink} target="_blank" rel="noreferrer"
                                style={{ display:"inline-flex", alignItems:"center", gap:3,
                                  fontSize:12, fontWeight:600, color:ACCENT, textDecoration:"none" }}>
                                Live <ExtIcon size={12} />
                              </a>
                            )}
                            {proj.githubLink && (
                              <a href={proj.githubLink} target="_blank" rel="noreferrer"
                                style={{ display:"inline-flex", alignItems:"center", gap:3,
                                  fontSize:12, fontWeight:600, color:ACCENT, textDecoration:"none" }}>
                                Code <GithubIcon size={12} />
                              </a>
                            )}
                          </div>
                        </div>
                        {proj.description && (
                          <p style={{ fontSize:13, color:TEXT_SEC, lineHeight:1.6,
                            margin:"4px 0 10px" }}>
                            {proj.description}
                          </p>
                        )}
                        {proj.techStack?.length > 0 && (
                          <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                            {proj.techStack.map((t, j) => (
                              <span key={j} style={{
                                fontSize:11, padding:"3px 9px", borderRadius:20,
                                background:SURFACE, border:`1px solid ${BORDER}`,
                                color:TEXT_SEC, fontWeight:500,
                              }}>{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                : <EmptyNote text="No projects listed." />
              }
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── tiny reusable pieces ── */
const chipStyle = {
  display:"inline-flex", alignItems:"center", gap:6,
  fontSize:13, color:"#475569", textDecoration:"none",
  background:"#f8fafc", border:"1px solid #e2e8f0",
  borderRadius:8, padding:"5px 12px",
};

const LinkPill = ({ href, label, icon }) => (
  <a href={href} target="_blank" rel="noreferrer" style={{
    display:"inline-flex", alignItems:"center", gap:5,
    fontSize:12, fontWeight:500, color:ACCENT,
    background:ACCENT_LIGHT, border:`1px solid ${ACCENT_MID}`,
    borderRadius:20, padding:"4px 13px", textDecoration:"none",
  }}>
    {icon} {label}
  </a>
);

export default ViewProfile;