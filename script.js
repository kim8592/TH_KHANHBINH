        const { useState, useEffect, useRef } = React;

        
        const AUTHOR_NAME = "Trần Trọng Kim";
        const AUTHOR_PHONE = "0964567806";

        const STUDENT_STATUS = {
          ACTIVE: { id: 'active', label: 'Đang học', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          DROPPED: { id: 'dropped', label: 'Bỏ học', color: 'text-red-600', bg: 'bg-red-50' },
          TRANSFERRED: { id: 'transferred', label: 'Chuyển trường', color: 'text-amber-600', bg: 'bg-amber-50' },
          MOVED_CLASS: { id: 'moved_class', label: 'Chuyển lớp', color: 'text-blue-600', bg: 'bg-blue-50' }
        };

        const ZaloIcon = ({ size = 16, className = "" }) => (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M22.507 11.23c-.156-.464-.34-.916-.548-1.353-.207-.436-.45-.858-.72-1.26a10.023 10.023 0 0 0-1.077-1.378 10.662 10.662 0 0 0-1.428-1.265 11.996 11.996 0 0 0-1.742-1.082A13.437 13.437 0 0 0 14.885 4.1a14.897 14.897 0 0 0-2.264-.474c-.38-.046-.763-.075-1.147-.087-.384-.012-.767-.008-1.15.012-.383.02-.764.055-1.145.105-.38.05-.758.115-1.134.195a14.864 14.864 0 0 0-2.22.65c-.358.13-.71.277-1.054.44a11.905 11.905 0 0 0-1.928 1.157 10.323 10.323 0 0 0-1.547 1.455c-.23.272-.44.558-.626.858a9.146 9.146 0 0 0-.825 2.022 9.146 9.146 0 0 0-.256 2.115c.01.353.04.706.087 1.055.048.35.114.697.198 1.04.084.343.187.68.307 1.01.12.33.256.654.407.97.15.316.315.626.494.927.18.3.37.593.578.877.207.284.426.56.654.825l-.578 2.316c-.052.207-.063.424-.032.636.03.21.096.413.195.6a1.442 1.442 0 0 0 .61.624c.24.13.51.196.78.196a1.517 1.517 0 0 0 .584-.117l3.522-1.507c.394.135.795.247 1.202.333.407.086.82.147 1.236.183.416.036.834.048 1.253.036.418-.012.836-.048 1.25-.108a14.892 14.892 0 0 0 2.417-.63 12.01 12.01 0 0 0 2.15-1.045 10.323 10.323 0 0 0 1.763-1.42 9.074 9.074 0 0 0 1.233-1.69 8.72 8.72 0 0 0 .864-2.128 9.052 9.052 0 0 0 .04-2.227z" />
          </svg>
        );

        const QUALITY_CRITERIA = [
          { id: 'patriotism', name: 'Yêu nước' },
          { id: 'humanity', name: 'Nhân ái' },
          { id: 'diligence', name: 'Chăm chỉ' },
          { id: 'honesty', name: 'Trung thực' },
          { id: 'responsibility', name: 'Trách nhiệm' }
        ];

        const GENERAL_COMPETENCIES = [
          { id: 'self_control', name: 'Tự chủ & Tự học' },
          { id: 'communication', name: 'Giao tiếp & Hợp tác' },
          { id: 'problem_solving', name: 'Giải quyết vấn đề & Sáng tạo' }
        ];

        const SPECIFIC_COMPETENCIES = [
          { id: 'lang', name: 'Ngôn ngữ' },
          { id: 'math', name: 'Tính toán' },
          { id: 'sci', name: 'Khoa học' },
          { id: 'tech', name: 'Công nghệ' },
          { id: 'it', name: 'Tin học' },
          { id: 'art', name: 'Thẩm mĩ' },
          { id: 'phys', name: 'Thể chất' }
        ];

        const SUBJECT_TO_COMPETENCY_MAP = {
          'Tiếng Việt': 'lang',
          'Toán': 'math',
          'Khoa học': 'sci',
          'Tự nhiên và Xã hội': 'sci',
          'Công nghệ': 'tech',
          'Tin học': 'it',
          'Mĩ thuật': 'art',
          'Âm nhạc': 'art',
          'Giáo dục Thể chất': 'phys'
        };

        const EditableCell = ({ value, onSave, className, isDraft, disabled }) => {
          const [localValue, setLocalValue] = useState(value || '');
          const textareaRef = useRef(null);

          const adjustHeight = () => {
            const textarea = textareaRef.current;
            if (textarea) {
              textarea.style.height = 'auto';
              textarea.style.height = (textarea.scrollHeight + 2) + 'px';
            }
          };

          useEffect(() => {
            setLocalValue(value || '');
            const timer = setTimeout(adjustHeight, 0);
            return () => clearTimeout(timer);
          }, [value]);

          const handleChange = (e) => {
            const newVal = e.target.value;
            setLocalValue(newVal);
            adjustHeight();
            onSave(newVal);
          };

          return (
            <textarea
              ref={textareaRef}
              disabled={disabled}
              className={`${className} ${isDraft ? 'bg-yellow-50 shadow-inner' : ''} ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-50 focus:bg-white'} overflow-hidden whitespace-pre-wrap break-words min-h-[40px] p-2 rounded transition-colors w-full resize-none`}
              rows={1}
              value={localValue}
              onChange={handleChange}
            />
          );
        };

        const Toast = ({ message, type, icon }) => (
          <div className={`fixed top-6 right-6 z-[200] toast ${type === 'success' ? 'bg-emerald-50 border-emerald-300' : type === 'error' ? 'bg-red-50 border-red-300' : 'bg-blue-50 border-blue-300'} border-2 rounded-xl p-4 shadow-2xl max-w-sm`}>
            <div className="flex items-start gap-4">
              <span className="text-2xl mt-1">{icon}</span>
              <div className="flex-1">
                <p className={`font-black text-sm ${type === 'success' ? 'text-emerald-900' : type === 'error' ? 'text-red-900' : 'text-blue-900'} uppercase tracking-wide`}>
                  {type === 'success' ? 'Thành công' : type === 'error' ? 'Lỗi' : 'Thông báo'}
                </p>
                <p className={`text-sm mt-1 ${type === 'success' ? 'text-emerald-700' : type === 'error' ? 'text-red-700' : 'text-blue-700'}`}>
                  {message}
                </p>
              </div>
            </div>
          </div>
        );

        const App = () => {
          const [user, setUser] = useState(null);
          const [years, setYears] = useState([]);
          const [classes, setClasses] = useState([]);
          const [months, setMonths] = useState([]);
          const [subjects, setSubjects] = useState([]);
          const [students, setStudents] = useState([]);
          const [studentData, setStudentData] = useState({});
          const [draftData, setDraftData] = useState({});

          const [selectedYearId, setSelectedYearId] = useState('');
          const [selectedClassId, setSelectedClassId] = useState('');
          const [selectedMonthId, setSelectedMonthId] = useState('');
          const [selectedSubId, setSelectedSubId] = useState('');
          const [selectedCriteriaId, setSelectedCriteriaId] = useState('');
          
          const [viewMode, setViewMode] = useState('subject');
          const [systemMode, setSystemMode] = useState('smas');
          const [showLevel, setShowLevel] = useState(true);
          const [showNote, setShowNote] = useState(true);

          const [modalType, setModalType] = useState(null);
          const [confirmDelete, setConfirmDelete] = useState(null);
          const [editItem, setEditItem] = useState(null);
          const [inputValue, setInputValue] = useState('');
          const [bulkInput, setBulkInput] = useState('');
          const [aiPrompt, setAiPrompt] = useState('');
          const [isGenerating, setIsGenerating] = useState(false);
          const [isSaving, setIsSaving] = useState(false);
          const [copySuccess, setCopySuccess] = useState(null);
          const [isAuthValid, setIsAuthValid] = useState(true);
          const [statusModalStudent, setStatusModalStudent] = useState(null);
          const [showMoveTargetSelect, setShowMoveTargetSelect] = useState(false);
          const [isMoving, setIsMoving] = useState(false);
          const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
          const [showApiKeyModal, setShowApiKeyModal] = useState(false);
          
          const [draggedStudentId, setDraggedStudentId] = useState(null);
          const [dragOverStudentId, setDragOverStudentId] = useState(null);
          
          const [toast, setToast] = useState(null);

          const showToast = (message, type = 'info', icon = 'ℹ️', duration = 4000) => {
            setToast({ message, type, icon });
            setTimeout(() => setToast(null), duration);
          };

          useEffect(() => {
            const _v = (s) => btoa(unescape(encodeURIComponent(s)));
            if (_v(AUTHOR_NAME) !== "VHLhuqduIFRy4buNbmcgS2lt" || _v(AUTHOR_PHONE) !== "MDk2NDU2NzgwNg==") {
              setIsAuthValid(false);
            }
          }, []);

          useEffect(() => {
            const initAuth = async () => {
              try {
                await firebase.auth().signInAnonymously();
              } catch (err) {
                console.error('Auth error:', err);
              }
            };
            initAuth();
            const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
            return () => unsubscribe();
          }, []);

          useEffect(() => {
            if (!user || !isAuthValid) return;
            try {
              const unsubYears = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('years')
                .onSnapshot(s => setYears(s.docs.map(d => ({id: d.id, ...d.data()})).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))));
              const unsubCla = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('classes')
                .onSnapshot(s => setClasses(s.docs.map(d => ({id: d.id, ...d.data()})).sort((a, b) => a.name.localeCompare(b.name, 'vi', { numeric: true }))));
              const unsubMon = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('months')
                .onSnapshot(s => setMonths(s.docs.map(d => ({id: d.id, ...d.data()})).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))));
              const unsubSub = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('subjects')
                .onSnapshot(s => setSubjects(s.docs.map(d => ({id: d.id, ...d.data()})).sort((a, b) => a.name.localeCompare(b.name, 'vi'))));
              return () => { unsubYears(); unsubCla(); unsubMon(); unsubSub(); };
            } catch (e) {
              console.error('Data load error:', e);
            }
          }, [user, isAuthValid]);

          useEffect(() => {
            if (!user || !selectedClassId || !selectedYearId || !isAuthValid) { setStudents([]); return; }
            try {
              return db.collection('artifacts').doc(appId).collection('public').doc('data').collection('years').doc(selectedYearId)
                .collection('classes').doc(selectedClassId).collection('students')
                .onSnapshot((snap) => {
                  const list = snap.docs.map(d => ({ id: d.id, status: 'active', ...d.data() }));
                  list.sort((a, b) => {
                    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
                    return (a.createdAt || 0) - (b.createdAt || 0);
                  });
                  setStudents(list);
                });
            } catch (e) {
              console.error('Students load error:', e);
            }
          }, [user, selectedClassId, selectedYearId, isAuthValid]);

          useEffect(() => {
            if (!user || !selectedMonthId || !selectedClassId || !selectedYearId || !isAuthValid) { setStudentData({}); setDraftData({}); return; }
            const isSubject = viewMode === 'subject';
            const isVnEduSubMode = systemMode === 'vnedu' && viewMode !== 'subject';
            if (isSubject && !selectedSubId) { setStudentData({}); setDraftData({}); return; }
            if (isVnEduSubMode && !selectedCriteriaId) { setStudentData({}); setDraftData({}); return; }

            const systemSuffix = systemMode === 'vnedu' ? '_vnedu' : '';
            let key = "";
            if (isSubject) {
              key = `${selectedYearId}_${selectedSubId}_${selectedMonthId}_${selectedClassId}${systemSuffix}`;
            } else if (isVnEduSubMode) {
              key = `${selectedYearId}_${viewMode}_vnedu_${selectedCriteriaId}_${selectedMonthId}_${selectedClassId}`;
            } else {
              key = `${selectedYearId}_${viewMode}_${selectedMonthId}_${selectedClassId}`;
            }
            
            try {
              return db.collection('artifacts').doc(appId).collection('public').doc('data').collection('comments').doc(key)
                .collection('entries').onSnapshot((snap) => {
                  const data = {};
                  snap.forEach(doc => { data[doc.id] = doc.data(); });
                  setStudentData(data);
                  setDraftData({});
                });
            } catch (e) {
              console.error('Student data load error:', e);
            }
          }, [user, selectedSubId, selectedCriteriaId, selectedMonthId, selectedClassId, selectedYearId, viewMode, isAuthValid, systemMode]);

          const saveApiKey = (key) => {
            localStorage.setItem('gemini_api_key', key);
            setApiKey(key);
            setShowApiKeyModal(false);
            showToast('API Key đã lưu thành công', 'success', '🔑', 3000);
          };

          const updateDraft = (studentId, field, value) => {
            const stu = students.find(s => s.id === studentId);
            if (stu?.status !== 'active') return;

            setDraftData(prev => {
              const currentStudentDraft = prev[studentId] || {};
              const currentStoredData = studentData[studentId] || {};
              let finalValue = value;
              if (field.startsWith('level')) {
                const currentLevel = currentStudentDraft[field] !== undefined ? currentStudentDraft[field] : (currentStoredData[field] || "");
                if (currentLevel === value) finalValue = "";
              }
              return { ...prev, [studentId]: { ...currentStudentDraft, [field]: finalValue } };
            });
          };

          const handleUpdateStatus = async (studentId, status) => {
            if (status === 'moved_class') {
              setShowMoveTargetSelect(true);
              return;
            }
            try {
              await db.collection('artifacts').doc(appId).collection('public').doc('data').collection('years').doc(selectedYearId)
                .collection('classes').doc(selectedClassId).collection('students').doc(studentId).update({ status });
              setStatusModalStudent(null);
              showToast('Cập nhật trạng thái thành công', 'success', '✅', 3000);
            } catch (e) { 
              console.error(e); 
              showToast('Lỗi cập nhật trạng thái: ' + e.message, 'error', '❌', 4000);
            }
          };

          const handleMoveStudentToClass = async (targetClassId) => {
            if (!statusModalStudent || !targetClassId || isMoving) return;
            setIsMoving(true);
            try {
              const batch = db.batch();
              const newStudentRef = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('years').doc(selectedYearId)
                .collection('classes').doc(targetClassId).collection('students').doc();
              batch.set(newStudentRef, {
                name: statusModalStudent.name,
                status: 'active',
                createdAt: statusModalStudent.createdAt || Date.now(),
                movedFrom: selectedClassId
              });
              const oldStudentRef = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('years').doc(selectedYearId)
                .collection('classes').doc(selectedClassId).collection('students').doc(statusModalStudent.id);
              batch.delete(oldStudentRef);
              await batch.commit();
              setStatusModalStudent(null);
              setShowMoveTargetSelect(false);
              showToast('Di chuyển học sinh thành công', 'success', '✅', 3000);
            } catch (e) { 
              console.error("Lỗi di chuyển học sinh:", e); 
              showToast('Lỗi di chuyển: ' + e.message, 'error', '❌', 4000);
            } finally { setIsMoving(false); }
          };

          const handleDragStart = (e, studentId) => {
            setDraggedStudentId(studentId);
          };

          const handleDragOver = (e, studentId) => {
            e.preventDefault();
            setDragOverStudentId(studentId);
          };

          const handleDrop = async (e, targetStudentId) => {
            e.preventDefault();
            if (!draggedStudentId || draggedStudentId === targetStudentId) {
              setDraggedStudentId(null);
              setDragOverStudentId(null);
              return;
            }

            const draggedIndex = students.findIndex(s => s.id === draggedStudentId);
            const targetIndex = students.findIndex(s => s.id === targetStudentId);

            if (draggedIndex === -1 || targetIndex === -1) {
              setDraggedStudentId(null);
              setDragOverStudentId(null);
              return;
            }

            const newList = [...students];
            [newList[draggedIndex], newList[targetIndex]] = [newList[targetIndex], newList[draggedIndex]];
            
            try {
              const batch = db.batch();
              newList.forEach((stu, i) => {
                const ref = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('years').doc(selectedYearId)
                  .collection('classes').doc(selectedClassId).collection('students').doc(stu.id);
                batch.update(ref, { order: i });
              });
              await batch.commit();
              showToast('Sắp xếp học sinh thành công', 'success', '✅', 2000);
            } catch (e) { 
              console.error("Lỗi sắp xếp:", e); 
              showToast('Lỗi sắp xếp: ' + e.message, 'error', '❌', 4000);
            }

            setDraggedStudentId(null);
            setDragOverStudentId(null);
          };

          const handleSaveAllToFirebase = async () => {
            const studentIds = Object.keys(draftData);
            if (studentIds.length === 0) return;
            setIsSaving(true);
            try {
              const systemSuffix = systemMode === 'vnedu' ? '_vnedu' : '';
              const isVnEduSubMode = systemMode === 'vnedu' && viewMode !== 'subject';
              let key = "";
              if (viewMode === 'subject') key = `${selectedYearId}_${selectedSubId}_${selectedMonthId}_${selectedClassId}${systemSuffix}`;
              else if (isVnEduSubMode) key = `${selectedYearId}_${viewMode}_vnedu_${selectedCriteriaId}_${selectedMonthId}_${selectedClassId}`;
              else key = `${selectedYearId}_${viewMode}_${selectedMonthId}_${selectedClassId}`;

              const batch = db.batch();
              for (const sId of studentIds) {
                const docRef = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('comments').doc(key)
                  .collection('entries').doc(sId);
                const updates = draftData[sId];
                batch.set(docRef, updates, { merge: true });
                if (viewMode === 'subject' && updates.level !== undefined) {
                  const subjectName = subjects.find(s => s.id === selectedSubId)?.name;
                  const targetCompId = SUBJECT_TO_COMPETENCY_MAP[subjectName];
                  if (targetCompId) {
                    let compKey = "";
                    let compField = "level";
                    let compLevelValue = updates.level === 'H' ? 'Đ' : updates.level;
                    if (systemMode === 'smas') {
                      compKey = `${selectedYearId}_specific_${selectedMonthId}_${selectedClassId}`;
                      compField = `level_${targetCompId}`;
                    } else {
                      compKey = `${selectedYearId}_specific_vnedu_${targetCompId}_${selectedMonthId}_${selectedClassId}`;
                      compField = "level";
                    }
                    const compDocRef = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('comments').doc(compKey)
                      .collection('entries').doc(sId);
                    batch.set(compDocRef, { [compField]: compLevelValue }, { merge: true });
                  }
                }
              }
              await batch.commit();
              setDraftData({});
              showToast(`Đã lưu ${studentIds.length} học sinh thành công`, 'success', '✅', 3000);
            } catch (error) { 
              console.error(error); 
              showToast('Lỗi lưu dữ liệu: ' + error.message, 'error', '❌', 4000);
            } finally { setIsSaving(false); }
          };

          const runAI = async () => {
            if (!isAuthValid) return;
            if (!apiKey) {
              setShowApiKeyModal(true);
              showToast('Vui lòng cấu hình API Key trước', 'info', '⚙️', 3000);
              return;
            }

            const allTargets = students.filter(s => {
              if (s.status !== 'active') return false;
              const d = studentData[s.id] || {};
              const draft = draftData[s.id] || {};
              const comment = draft.comment !== undefined ? draft.comment : (d.comment || "");
              
              if (comment) return false;

              if (viewMode === 'subject') {
                const level = draft.level !== undefined ? draft.level : (d.level || "");
                return !!level;
              } else if (systemMode === 'vnedu' && viewMode !== 'subject') {
                const level = draft.level !== undefined ? draft.level : (d.level || "");
                return !!level;
              } else if (systemMode === 'smas' && viewMode !== 'subject') {
                const list = viewMode === 'quality' ? QUALITY_CRITERIA : (viewMode === 'competency' ? GENERAL_COMPETENCIES : SPECIFIC_COMPETENCIES);
                return list.some(c => {
                  const level = draft[`level_${c.id}`] !== undefined ? draft[`level_${c.id}`] : (d[`level_${c.id}`] || "");
                  return !!level;
                });
              }

              return false;
            });

            if (!allTargets.length) { 
              showToast('Không có học sinh nào cần nhận xét (chưa được chọn mức đạt hoặc đã có nhận xét)', 'info', '⚠️', 4000);
              return; 
            }

            setIsGenerating(true);
            showToast(`Đang tạo nhận xét cho ${allTargets.length} học sinh...`, 'info', '⏳', 2000);
            
            const BATCH_SIZE = 20;
            let successCount = 0;
            for (let i = 0; i < allTargets.length; i += BATCH_SIZE) {
              const batch = allTargets.slice(i, i + BATCH_SIZE);
              const studentContexts = batch.map(stu => {
                const d = studentData[stu.id] || {};
                const draft = draftData[stu.id] || {};
                let info = "";
                
                if (viewMode === 'subject') {
                  const subName = subjects.find(s=>s.id===selectedSubId)?.name;
                  const lv = draft.level !== undefined ? draft.level : (d.level || "");
                  info = `Môn: ${subName}, Mức: ${lv}`;
                } else if (systemMode === 'vnedu' && viewMode !== 'subject') {
                  const list = viewMode === 'quality' ? QUALITY_CRITERIA : (viewMode === 'competency' ? GENERAL_COMPETENCIES : SPECIFIC_COMPETENCIES);
                  const criteriaName = list.find(c => c.id === selectedCriteriaId)?.name;
                  const lv = draft.level !== undefined ? draft.level : (d.level || "");
                  info = `Tiêu chí: ${criteriaName}, Mức: ${lv}`;
                } else {
                  const list = viewMode === 'quality' ? QUALITY_CRITERIA : (viewMode === 'competency' ? GENERAL_COMPETENCIES : SPECIFIC_COMPETENCIES);
                  const details = list.map(c => {
                    const lv = draft[`level_${c.id}`] !== undefined ? draft[`level_${c.id}`] : (d[`level_${c.id}`] || "");
                    return lv ? `${c.name}: ${lv}` : null;
                  }).filter(Boolean).join('; ');
                  info = `Đánh giá tổng hợp: ${details}`;
                }
                return { studentId: stu.id, studentName: stu.name, context: info, note: draft.note || d.note || "" };
              });
              
              const systemPrompt = `Bạn là GV Tiểu học Việt Nam. Hãy viết nhận xét học sinh theo định dạng JSON.
      QUY TẮC CHUNG:
      - Ngôn ngữ: Tiếng Việt, gần gũi, khích lệ. 
      - Cấu trúc: Bắt đầu bằng 'Em...'. 
      - Bắt buộc câu nhận xét của mỗi học sinh đều khác nhau.
      - Tuyệt đối không nêu lại tên của học sinh.
      - KHÔNG dùng từ 'Hoàn thành tốt' cho học sinh ở mức Đạt (Đ) hoặc Hoàn thành (H).
      - Tuyệt đối không dùng cụm từ Thầy/cô.
      - KHÔNG lặp lại tên môn học hoặc tên năng lực.
      - Dựa vào 'data' để viết: 
        Mức T (Tốt) thì khen ngợi. 
        Mức Đ/H (Đạt) thì khen ngợi và hướng phát huy. 
        Mức C (Chưa đạt) thì khen nhẹ, nêu hạn chế, nêu biện pháp khắc phục cụ thể.
       Trả về định dạng JSON: {"studentId": "nội dung nhận xét"}`;
              const userInstruction = `Ghi chú riêng của giáo viên:
${aiPrompt}

Số học sinh cần nhận xét: ${studentContexts.length}

Danh sách học sinh:
${JSON.stringify(studentContexts)}

Hãy viết nhận xét cho từng học sinh theo đúng ID và trả về đúng ${studentContexts.length} nhận xét.`;

              
              try {
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                    contents: [{ parts: [{ text: userInstruction }] }], 
                    systemInstruction: { parts: [{ text: systemPrompt }] },
                    generationConfig: { responseMimeType: "application/json" }
                  })
                });
                const result = await res.json();
                if (result.error) {
                  console.error('API error:', result.error.message);
                  showToast('Lỗi API: ' + result.error.message, 'error', '❌', 4000);
                  break;
                }
                const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;
                if (jsonText) {
                  const results = JSON.parse(jsonText);
                  setDraftData(prev => {
                    const newDraft = { ...prev };
                    Object.keys(results).forEach(sId => { newDraft[sId] = { ...(newDraft[sId] || {}), comment: results[sId] }; });
                    return newDraft;
                  });
                  successCount += Object.keys(results).length;
                }
              } catch (e) { 
                console.error(e); 
                showToast('Lỗi kết nối: ' + e.message, 'error', '❌', 4000);
                break;
              }
            }
            setIsGenerating(false);
            showToast(`Tạo nhận xét thành công cho ${successCount}/${allTargets.length} học sinh`, 'success', '✅', 3000);
          };

          const handleSendZalo = (studentId) => {
            const d = studentData[studentId] || {};
            const draft = draftData[studentId] || {};
            const finalComment = draft.comment !== undefined ? draft.comment : (d.comment || "");
            const levelTxt = draft.level !== undefined ? draft.level : (d.level || "Đ");
            const stu = students.find(s => s.id === studentId);
            if (!stu) return;
            let label = "";
            if (systemMode === 'vnedu' && viewMode !== 'subject') {
              const list = viewMode === 'quality' ? QUALITY_CRITERIA : (viewMode === 'competency' ? GENERAL_COMPETENCIES : SPECIFIC_COMPETENCIES);
              label = list.find(c => c.id === selectedCriteriaId)?.name;
            } else label = viewMode === 'subject' ? subjects.find(s => s.id === selectedSubId)?.name : 'Năng lực - Phẩm chất';
            const monthName = months.find(m => m.id === selectedMonthId)?.name || 'tháng';
            const levelMap = { 'T': 'Hoàn thành tốt ⭐', 'H': 'Hoàn thành ✅', 'Đ': 'Đạt ✅', 'C': 'Cần cố gắng 📝' };
            const header = `🌸 THÔNG TIN ĐÁNH GIÁ THÁNG - ${monthName.toUpperCase()} 🌸`;
            const body = `Chào Phụ huynh em: *${stu.name.toUpperCase()}*\n\n📚 *Nội dung:* ${label}\n📊 *Mức đạt:* ${levelMap[levelTxt] || levelTxt}\n✏️ *Nhận xét:* ${finalComment || "Em học tập tích cực và có nhiều tiến bộ."}\n\n🍀 Chúc em luôn chăm ngoan và học tốt nhé!\n\n🌸Gia sư Tiểu học: https://roboki.vn/🌸`;
            const content = `${header}\n\n${body}`;
            const tempInput = document.createElement("textarea");
            tempInput.value = content; document.body.appendChild(tempInput);
            tempInput.select(); document.execCommand("copy"); document.body.removeChild(tempInput);
            setCopySuccess(studentId); 
            showToast(`Đã sao chép tin nhắn cho ${stu.name}`, 'success', '📋', 2000);
            setTimeout(() => setCopySuccess(null), 2000);
            window.open(`https://id.zalo.me/account?continue=https%3A%2F%2Fchat.zalo.me%2F`, '_blank');
          };

          const exportExcel = async () => {
            if (!students.length || !window.XLSX) {
              showToast('Không có học sinh nào để xuất', 'info', '⚠️', 3000);
              return;
            }
            try {
              const className = classes.find(c => c.id === selectedClassId)?.name || 'Lớp';
              const monthName = months.find(m => m.id === selectedMonthId)?.name || 'Tháng';
              let contentName = "";
              
              let dataRows = [];
              let headerColumns = ['STT', 'HỌ VÀ TÊN', 'TRẠNG THÁI'];
              
              // Xác định các cột cần xuất dựa trên viewMode và systemMode
              if (viewMode === 'subject') {
                contentName = subjects.find(s => s.id === selectedSubId)?.name || "Môn học";
                headerColumns.push('MỨC ĐẠT');
              } else if (systemMode === 'vnedu') {
                const list = viewMode === 'quality' ? QUALITY_CRITERIA : (viewMode === 'competency' ? GENERAL_COMPETENCIES : SPECIFIC_COMPETENCIES);
                contentName = list.find(c => c.id === selectedCriteriaId)?.name || "Đánh giá";
                headerColumns.push('MỨC ĐẠT');
              } else if (systemMode === 'smas' && viewMode !== 'subject') {
                // SMAS: Thêm tất cả các năng lực
                if (viewMode === 'quality') {
                  contentName = "Phẩm chất";
                  QUALITY_CRITERIA.forEach(c => headerColumns.push(c.name));
                } else if (viewMode === 'competency') {
                  contentName = "NL Chung";
                  GENERAL_COMPETENCIES.forEach(c => headerColumns.push(c.name));
                } else {
                  contentName = "NL Đặc thù";
                  SPECIFIC_COMPETENCIES.forEach(c => headerColumns.push(c.name));
                }
              } else {
                contentName = viewMode === 'quality' ? "Phẩm chất" : (viewMode === 'competency' ? "NL Chung" : "NL Đặc thù");
              }
              
              headerColumns.push('NHẬN XÉT CHI TIẾT');

              // Tiêu đề
              dataRows.push([`BẢNG NHẬN XÉT CHI TIẾT (${systemMode.toUpperCase()})`]);
              dataRows.push([`Lớp: ${className} - ${monthName}`]);
              dataRows.push([`Nội dung: ${contentName}`]);
              dataRows.push([]);
              
              // Header table
              dataRows.push(headerColumns);
              
              // Data
              students.forEach((s, i) => {
                const d = studentData[s.id] || {};
                const draft = draftData[s.id] || {};
                const comment = draft.comment !== undefined ? draft.comment : (d.comment || "");
                const statusText = STUDENT_STATUS[s.status?.toUpperCase()]?.label || 'Đang học';
                
                let row = [i + 1, s.name.toUpperCase(), statusText];
                
                if (viewMode === 'subject') {
                  const level = draft.level !== undefined ? draft.level : (d.level || "");
                  row.push(level);
                } else if (systemMode === 'vnedu') {
                  const level = draft.level !== undefined ? draft.level : (d.level || "");
                  row.push(level);
                } else if (systemMode === 'smas' && viewMode !== 'subject') {
                  // SMAS: Thêm mức cho từng năng lực
                  const list = viewMode === 'quality' ? QUALITY_CRITERIA : (viewMode === 'competency' ? GENERAL_COMPETENCIES : SPECIFIC_COMPETENCIES);
                  list.forEach(c => {
                    const level = draft[`level_${c.id}`] !== undefined ? draft[`level_${c.id}`] : (d[`level_${c.id}`] || "");
                    row.push(level);
                  });
                }
                
                row.push(comment);
                dataRows.push(row);
              });

              // Tạo workbook
              const wb = XLSX.utils.book_new();
              const ws = XLSX.utils.aoa_to_sheet(dataRows);

              // Định dạng
              const border = { style: 'thin', color: { rgb: '000000' } };
              const borderAll = {
                top: border,
                bottom: border,
                left: border,
                right: border
              };

              // Tô màu header
              const headerFill = { fgColor: { rgb: 'FF4472C4' } };
              const headerFont = { bold: true, color: { rgb: 'FFFFFFFF' }, size: 12 };

              // Merge cells cho tiêu đề
              ws['!merges'] = [];
              ws['!merges'].push({ s: { r: 0, c: 0 }, e: { r: 0, c: headerColumns.length - 1 } });
              ws['!merges'].push({ s: { r: 1, c: 0 }, e: { r: 1, c: headerColumns.length - 1 } });
              ws['!merges'].push({ s: { r: 2, c: 0 }, e: { r: 2, c: headerColumns.length - 1 } });

              // Định dạng cột
              for (let i = 0; i < dataRows.length; i++) {
                for (let j = 0; j < dataRows[i].length; j++) {
                  const cellRef = XLSX.utils.encode_col(j) + (i + 1);
                  if (!ws[cellRef]) ws[cellRef] = {};
                  
                  // Border cho tất cả
                  ws[cellRef].s = { border: borderAll };

                  // Format header (row 5)
                  if (i === 4) {
                    ws[cellRef].s.fill = headerFill;
                    ws[cellRef].s.font = headerFont;
                    ws[cellRef].s.alignment = { horizontal: 'center', vertical: 'center', wrapText: true };
                  } else {
                    // Format data rows
                    const isFirstCol = j === 0;
                    const isCenterCol = j >= 3 && j < headerColumns.length - 1; // Các cột mức đạt
                    ws[cellRef].s.alignment = { horizontal: isFirstCol || isCenterCol ? 'center' : 'left', vertical: 'top', wrapText: true };
                  }
                }
              }

              // Độ rộng cột - động theo số lượng cột
              ws['!cols'] = [];
              ws['!cols'][0] = { wch: 6 };   // STT
              ws['!cols'][1] = { wch: 25 };  // Tên
              ws['!cols'][2] = { wch: 18 };  // Trạng thái
              
              // Các cột mức đạt
              for (let i = 3; i < headerColumns.length - 1; i++) {
                ws['!cols'][i] = { wch: 12 };
              }
              
              // Cột nhận xét
              ws['!cols'][headerColumns.length - 1] = { wch: 60 };

              // Độ cao hàng
              ws['!rows'] = [];
              for (let i = 0; i < dataRows.length; i++) {
                ws['!rows'][i] = { hpt: i === 4 ? 25 : 30, hidden: false };
              }

              XLSX.utils.book_append_sheet(wb, ws, "NhanXet");
              XLSX.writeFile(wb, `NhanXet_${contentName}_${className}_${monthName}.xlsx`);
              showToast(`Xuất file Excel thành công`, 'success', '📥', 3000);
            } catch (e) {
              console.error(e);
              showToast('Lỗi xuất file: ' + e.message, 'error', '❌', 4000);
            }
          };

          const SectionBox = ({ label, items, selectedId, onSelect, type }) => (
            <div className="bg-white p-4 rounded-xl border-2 border-slate-300 shadow-sm flex flex-col gap-2 flex-1 min-w-[200px]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{label}</span>
                <div className="flex gap-1">
                  {selectedId && !['system_comp'].includes(type) && (
                    <>
                      <button onClick={() => { const item = items.find(i => i.id === selectedId); setEditItem(item); setInputValue(item.name); setModalType(type); }} className="p-1 text-blue-500 hover:bg-blue-50 rounded text-xs">✏️</button>
                      <button onClick={() => { const item = items.find(i => i.id === selectedId); setConfirmDelete({ type, id: item.id, name: item.name }); }} className="p-1 hover:text-red-600 text-xs">🗑️</button>
                    </>
                  )}
                  {!['system_comp'].includes(type) && <button onClick={() => { setEditItem(null); setInputValue(''); setModalType(type); }} className="p-1 text-indigo-500 text-xs">➕</button>}
                </div>
              </div>
              <select value={selectedId || ''} onChange={(e) => onSelect(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold outline-none cursor-pointer hover:bg-white transition-all">
                <option value="">-- {label} --</option>
                {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>
          );

          if (!isAuthValid) return <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white font-black text-center">LỖI XÁC THỰC BẢN QUYỀN<br/>VUI LÒNG LIÊN HỆ TÁC GIẢ</div>;

          const draftCount = Object.keys(draftData).length;

          return (
            <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-12 font-sans text-left flex flex-col w-full">
              {toast && <Toast message={toast.message} type={toast.type} icon={toast.icon} />}
              
              <header className="bg-indigo-900 text-white p-4 md:p-6 shadow-xl border-b-4 border-indigo-700 w-full">
                <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6 px-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/20 rounded-xl">🎓</div>
                    <div className="flex flex-col">
                      <h1 className="text-xl md:text-2xl font-black uppercase leading-none tracking-tight">ĐÁNH GIÁ THƯỜNG XUYÊN</h1>
                      <span className="text-indigo-300 text-[11px] font-bold uppercase mt-1 italic tracking-wider">CHUYỂN ĐỔI SỐ TRONG CÔNG TÁC ĐÁNH GIÁ Ở TIỂU HỌC</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex bg-indigo-950/50 p-1 rounded-xl gap-1 items-center">
                      {['smas', 'vnedu'].map(sys => (
                        <button key={sys} onClick={() => { setSystemMode(sys); setSelectedCriteriaId(''); setDraftData({}); }} className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase transition-all ${systemMode === sys ? 'bg-white text-indigo-900 shadow-lg' : 'text-indigo-300 hover:text-white'}`}>
                          🌐 {sys}
                        </button>
                      ))}
                      <div className="w-px h-6 bg-indigo-700 mx-1"></div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={handleSaveAllToFirebase} disabled={isSaving || draftCount === 0} className={`flex items-center gap-2 px-4 py-2.5 rounded-l-lg text-[11px] font-black uppercase transition-all shadow-md active:scale-95 ${draftCount > 0 ? 'bg-amber-500 text-white hover:bg-amber-600 animate-pulse' : 'bg-indigo-800 text-indigo-400 opacity-50 cursor-not-allowed'}`}>
                          {isSaving ? '⏳' : '💾'} Lưu ({draftCount})
                        </button>
                        <button onClick={() => setShowApiKeyModal(true)} className={`p-2.5 rounded-r-lg transition-all ${apiKey ? 'bg-emerald-600 text-white' : 'bg-red-500 text-white animate-bounce'} shadow-md`}>
                          ⚙️
                        </button>
                      </div>
                    </div>
                    <div className="flex bg-indigo-950/50 p-1 rounded-xl gap-1 flex-wrap justify-center">
                      {['subject', 'competency', 'quality', 'specific'].map(m => (
                        <button key={m} onClick={() => { setViewMode(m); setSelectedCriteriaId(''); setDraftData({}); }} className={`px-4 py-2.5 rounded-lg text-[11px] font-black uppercase transition-all ${viewMode === m ? 'bg-indigo-600 text-white shadow-lg' : 'text-indigo-300 hover:text-white'}`}>
                          {m === 'competency' ? 'NL Chung' : (m === 'subject' ? 'Môn học' : (m === 'quality' ? 'Phẩm chất' : 'NL Đặc thù'))}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </header>

              <div className="w-full px-4 md:px-8 py-6 flex flex-wrap gap-4 items-stretch">
                <SectionBox label="📅 Năm học" items={years} selectedId={selectedYearId} onSelect={setSelectedYearId} type="year" />
                <SectionBox label="🏫 Lớp học" items={classes} selectedId={selectedClassId} onSelect={setSelectedClassId} type="class" />
                <SectionBox label="📆 Tháng" items={months} selectedId={selectedMonthId} onSelect={setSelectedMonthId} type="month" />
                {viewMode === 'subject' ? (
                  <SectionBox label="📚 Môn học" items={subjects} selectedId={selectedSubId} onSelect={setSelectedSubId} type="subject" />
                ) : systemMode === 'vnedu' ? (
                  <SectionBox label={viewMode === 'quality' ? '⭐ Chọn Phẩm chất' : (viewMode === 'competency' ? '🧠 Chọn NL Chung' : '👤 Chọn NL Đặc thù')} items={viewMode === 'quality' ? QUALITY_CRITERIA : (viewMode === 'competency' ? GENERAL_COMPETENCIES : SPECIFIC_COMPETENCIES)} selectedId={selectedCriteriaId} onSelect={setSelectedCriteriaId} type="system_comp" />
                ) : (
                  <div className="bg-indigo-50 p-4 rounded-xl border-2 border-indigo-200 shadow-sm flex items-center justify-center font-black text-indigo-700 text-[10px] uppercase gap-2 flex-1 min-w-[200px]">
                    {viewMode === 'specific' ? '⭐' : (viewMode === 'competency' ? '🧠' : '👤')}
                    {viewMode === 'competency' ? 'NL CHUNG (SMAS)' : (viewMode === 'quality' ? 'PHẨM CHẤT (SMAS)' : 'NL ĐẶC THÙ (SMAS)')}
                  </div>
                )}
              </div>

              <main className="w-full px-4 md:px-8 flex-1">
                {selectedYearId && selectedClassId && selectedMonthId && (viewMode === 'subject' ? selectedSubId : (systemMode === 'vnedu' ? selectedCriteriaId : true)) ? (
                  <div className="space-y-6 w-full">
                    <div className="bg-white rounded-2xl p-6 border-2 border-slate-300 shadow-sm flex flex-col gap-4 w-full">
                      <div className="flex flex-col xl:flex-row gap-6 items-end">
                        <div className="flex-1 w-full text-left">
                          <label className="text-[10px] font-black text-slate-500 uppercase mb-2 block tracking-widest">Hướng dẫn AI (AI nhận xét theo hướng dẫn)</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-lg">✨</span>
                            <input className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-12 pr-4 py-4 text-sm font-semibold outline-none focus:border-indigo-500 transition-all" placeholder="Ghi thêm yêu cầu nếu cần..." value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}/>
                          </div>
                        </div>
                        <div className="flex gap-3 w-full xl:w-auto">
                          <button onClick={runAI} disabled={isGenerating || students.length === 0} className={`flex-1 xl:flex-none px-10 py-4 ${isGenerating ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase shadow-lg transition-all active:scale-95 disabled:opacity-50`}>
                            {isGenerating ? '⏳ Đang nhận xét...' : '✨ Nhận xét AI'}
                          </button>
                          <button onClick={() => { setEditItem(null); setBulkInput(''); setModalType('student'); }} className="p-4 bg-slate-800 text-white rounded-xl shadow-lg hover:bg-black transition-all active:scale-95 text-lg">👥</button>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 gap-4">
                        <div className="flex gap-3">
                          <button onClick={() => setShowLevel(!showLevel)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-black uppercase transition-all border ${showLevel ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-400 border-slate-200'}`}>
                            {showLevel ? '👁️' : '🚫'} Mức đạt
                          </button>
                          <button onClick={() => setShowNote(!showNote)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-black uppercase transition-all border ${showNote ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-400 border-slate-200'}`}>
                            {showNote ? '👁️' : '🚫'} Ghi chú
                          </button>
                        </div>
                        <button onClick={exportExcel} disabled={students.length === 0} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-[11px] font-black uppercase hover:bg-emerald-700 shadow-md">
                          📥 Xuất Excel
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border-2 border-slate-400 shadow-2xl overflow-hidden mb-12 w-full">
                      <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse table-fixed min-w-[1200px]">
                          <thead>
                            <tr className="bg-slate-200 border-b-2 border-slate-400">
                              <th className="p-4 text-center text-[10px] font-black uppercase w-20 border-r border-slate-400 sticky left-0 bg-slate-200 z-20">☰ STT</th>
                              <th className="p-4 text-center text-[10px] font-black uppercase w-56 border-r border-slate-400 sticky left-20 bg-slate-200 z-20">Học sinh</th>
                              {(systemMode === 'smas' && viewMode !== 'subject') ? (
                                showLevel && (viewMode === 'quality' ? QUALITY_CRITERIA : (viewMode === 'competency' ? GENERAL_COMPETENCIES : SPECIFIC_COMPETENCIES)).map(c => <th key={c.id} className="p-2 text-center text-[9px] font-black uppercase border-r border-slate-400 w-20">{c.name}</th>)
                              ) : (
                                showLevel && <th className="p-4 text-center text-[10px] font-black uppercase w-32 border-r border-slate-400">Mức đạt</th>
                              )}
                              {showNote && <th className="p-4 text-center text-[10px] font-black uppercase w-48 border-r border-slate-400">Ghi chú riêng</th>}
                              <th className="p-4 text-center text-[10px] font-black uppercase min-w-[400px]">Nhận xét chi tiết</th>
                              <th className="p-4 w-20 text-center text-[10px] font-black uppercase border-l border-slate-400">Zalo</th>
                              <th className="p-4 w-12"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y-2 divide-slate-300">
                            {students.map((stu, idx) => {
                              const d = studentData[stu.id] || {};
                              const draft = draftData[stu.id] || {};
                              const finalComment = draft.comment !== undefined ? draft.comment : (d.comment || "");
                              const finalNote = draft.note !== undefined ? draft.note : (d.note || "");
                              const isInactive = stu.status && stu.status !== 'active';
                              const statusConfig = STUDENT_STATUS[stu.status?.toUpperCase()] || STUDENT_STATUS.ACTIVE;
                              const isDragging = draggedStudentId === stu.id;
                              const isDragOver = dragOverStudentId === stu.id;

                              return (
                                <tr 
                                  key={stu.id} 
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, stu.id)}
                                  onDragOver={(e) => handleDragOver(e, stu.id)}
                                  onDrop={(e) => handleDrop(e, stu.id)}
                                  onDragLeave={() => setDragOverStudentId(null)}
                                  className={`transition-all draggable-row ${isDragging ? 'dragging-row' : ''} ${isDragOver ? 'drag-over-row' : (isInactive ? 'bg-slate-50' : 'hover:bg-indigo-50/50')} group`}>
                                  <td className={`p-3 text-center border-r border-slate-400 sticky left-0 z-10 ${isInactive ? 'text-slate-300 bg-slate-50' : 'text-slate-400 bg-slate-50'}`}>
                                    <span className="text-xs font-bold">{idx + 1}</span>
                                  </td>
                                  <td className="p-3 border-r border-slate-400 text-left sticky left-20 bg-inherit z-10">
                                    <button onClick={() => setStatusModalStudent(stu)} className="flex flex-col items-start w-full text-left group/name">
                                      <span className={`font-black text-sm uppercase transition-all ${isInactive ? 'text-slate-400 line-through' : 'text-slate-800 group-hover/name:text-indigo-600'}`}>
                                        {stu.name}
                                      </span>
                                      {isInactive && (
                                        <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded mt-1 ${statusConfig.bg} ${statusConfig.color}`}>
                                          {statusConfig.label}
                                        </span>
                                      )}
                                    </button>
                                  </td>
                                  {(systemMode === 'smas' && viewMode !== 'subject') ? (
                                    showLevel && (viewMode === 'quality' ? QUALITY_CRITERIA : (viewMode === 'competency' ? GENERAL_COMPETENCIES : SPECIFIC_COMPETENCIES)).map(c => {
                                      const lvVal = draft[`level_${c.id}`] !== undefined ? draft[`level_${c.id}`] : (d[`level_${c.id}`] || "");
                                      return (
                                        <td key={c.id} className="p-1 border-r border-slate-400">
                                          <div className="flex justify-center gap-0.5">
                                            {['T', 'Đ', 'C'].map(lv => (
                                              <button disabled={isInactive} key={lv} onClick={() => updateDraft(stu.id, `level_${c.id}`, lv)} className={`w-5 h-6 rounded font-black text-[9px] ${lvVal === lv ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'} disabled:opacity-20`}>{lv}</button>
                                            ))}
                                          </div>
                                        </td>
                                      );
                                    })
                                  ) : (
                                    showLevel && (
                                      <td className="p-3 border-r border-slate-400">
                                        <div className="flex justify-center gap-1">
                                          {(viewMode === 'subject' ? ['T', 'H', 'C'] : ['T', 'Đ', 'C']).map(lv => {
                                            const lvVal = draft.level !== undefined ? draft.level : (d.level || "");
                                            return (
                                              <button disabled={isInactive} key={lv} onClick={() => updateDraft(stu.id, 'level', lv)} className={`w-8 h-8 rounded-lg font-black text-[10px] ${lvVal === lv ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'} disabled:opacity-20`}>{lv}</button>
                                            );
                                          })}
                                        </div>
                                      </td>
                                    )
                                  )}
                                  {showNote && <td className="p-2 border-r border-slate-400 align-top"><EditableCell disabled={isInactive} value={finalNote} isDraft={draft.note !== undefined} onSave={(val) => updateDraft(stu.id, 'note', val)} className="bg-transparent text-xs font-bold text-indigo-700 outline-none" /></td>}
                                  <td className="p-2 text-left align-top">
                                    <EditableCell disabled={isInactive} value={finalComment} isDraft={draft.comment !== undefined} onSave={(val) => updateDraft(stu.id, 'comment', val)} className="bg-transparent text-sm font-medium text-slate-700 leading-relaxed" />
                                  </td>
                                  <td className="p-3 text-center border-l border-slate-400">
                                    <button disabled={!finalComment || isInactive} onClick={() => handleSendZalo(stu.id)} className={`p-2.5 rounded-full mx-auto transition-all ${copySuccess === stu.id ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-20'}`}>
                                      {copySuccess === stu.id ? '✅' : <ZaloIcon size={18} />}
                                    </button>
                                  </td>
                                  <td className="p-3 text-center"><button onClick={() => setConfirmDelete({ type: 'student', id: stu.id, name: stu.name })} className="text-slate-200 hover:text-red-500 text-lg">🗑️</button></td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : <div className="py-32 text-center bg-white rounded-3xl border-4 border-dashed border-slate-300 font-black text-slate-300 uppercase tracking-[0.2em] text-xl">Vui lòng chọn đủ dữ liệu</div>}
              </main>

              <footer className="w-full px-8 py-6 mt-auto">
                <div className="flex justify-between items-center text-[11px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 pt-6">
                  <div>TÁC GIẢ: {AUTHOR_NAME} • {AUTHOR_PHONE}</div>
                  <div className="text-right italic">SỬ DỤNG AI ĐỂ TỐI ƯU HÓA ĐÁNH GIÁ GIÁO DỤC</div>
                </div>
              </footer>

              {statusModalStudent && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
                  <div className="bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl border-t-8 border-indigo-600">
                    {!showMoveTargetSelect ? (
                      <>
                        <h3 className="text-lg font-black uppercase text-slate-800 mb-2">Trạng thái học sinh</h3>
                        <p className="text-sm font-bold text-indigo-600 uppercase mb-8">{statusModalStudent.name}</p>
                        <div className="grid grid-cols-1 gap-3">
                          {Object.keys(STUDENT_STATUS).map(key => {
                            const status = STUDENT_STATUS[key];
                            return (
                              <button 
                                key={status.id}
                                onClick={() => handleUpdateStatus(statusModalStudent.id, status.id)}
                                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all group ${statusModalStudent.status === status.id ? 'bg-indigo-50 border-indigo-600' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}
                              >
                                <div className={`p-2 rounded-xl ${statusModalStudent.status === status.id ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 group-hover:text-indigo-600 shadow-sm'}`}>
                                  {status.id === 'active' ? '✅' : status.id === 'dropped' ? '❌' : status.id === 'transferred' ? '✈️' : '➡️'}
                                </div>
                                <span className={`font-black text-xs uppercase ${statusModalStudent.status === status.id ? 'text-indigo-900' : 'text-slate-500'}`}>
                                  {status.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <button onClick={() => setStatusModalStudent(null)} className="w-full mt-8 py-4 font-black text-slate-400 uppercase text-[10px]">Đóng</button>
                      </>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <button onClick={() => setShowMoveTargetSelect(false)} className="p-2 -ml-2 text-slate-400 hover:text-indigo-600 text-xl">✕</button>
                          <h3 className="text-lg font-black uppercase text-slate-800">Chọn lớp chuyển đến</h3>
                        </div>
                        <div className="max-h-80 overflow-y-auto space-y-2 mb-8 custom-scrollbar">
                          {classes.filter(c => c.id !== selectedClassId).map(cls => (
                            <button key={cls.id} disabled={isMoving} onClick={() => handleMoveStudentToClass(cls.id)} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all group">
                              <span className="font-black text-sm uppercase">{cls.name}</span>
                              <span className="text-lg">→</span>
                            </button>
                          ))}
                        </div>
                        {isMoving && <div className="flex items-center justify-center gap-3 py-4 text-indigo-600 font-black text-[10px] uppercase">⏳ Đang di chuyển...</div>}
                        <button disabled={isMoving} onClick={() => setShowMoveTargetSelect(false)} className="w-full py-4 font-black text-slate-400 uppercase text-[10px]">Quay lại</button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {showApiKeyModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
                  <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl border-t-8 border-emerald-600">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl text-2xl">🔑</div>
                      <h3 className="text-xl font-black uppercase text-slate-800">VUI LÒNG NHẬP KEY API</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">Lấy API Key: <a href="https://kim8592.github.io/KIM/" target="_blank" className="text-blue-600 underline">Liên hệ: 0964567806</a></p>
                    <input type="password" className="w-full p-4 bg-slate-50 border-2 border-slate-300 rounded-xl mb-6 font-mono text-sm outline-none" placeholder="Nhập API Key..." value={apiKey} onChange={e => setApiKey(e.target.value)} />
                    <div className="flex gap-4">
                      <button onClick={() => setShowApiKeyModal(false)} className="flex-1 py-4 font-black text-slate-400 uppercase text-[10px]">Đóng</button>
                      <button onClick={() => saveApiKey(apiKey)} className="flex-[2] py-4 bg-emerald-600 text-white font-black rounded-xl uppercase text-[10px]">Lưu API Key</button>
                    </div>
                  </div>
                </div>
              )}

              {modalType && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
                  <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl border-t-8 border-indigo-600">
                    <h3 className="text-xl font-black uppercase text-slate-800 mb-6">{editItem ? "Sửa" : "Thêm"} {modalType === 'student' ? 'Học sinh' : 'Thông tin'}</h3>
                    {modalType === 'student' ? <textarea autoFocus className="w-full h-64 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl mb-6 font-bold outline-none" placeholder="Danh sách tên..." value={bulkInput} onChange={e => setBulkInput(e.target.value)}/> : <input autoFocus className="w-full p-4 bg-slate-50 border-2 border-slate-300 rounded-xl font-bold mb-6 outline-none" value={inputValue} onChange={e => setInputValue(e.target.value)}/>}
                    <div className="flex gap-4">
                      <button onClick={() => setModalType(null)} className="flex-1 py-4 font-black text-slate-400 uppercase text-[10px]">Đóng</button>
                      <button onClick={() => modalType === 'student' ? (async () => {
                        const names = bulkInput.split('\n').map(n => n.trim()).filter(n => n !== '');
                        const col = db.collection('artifacts').doc(appId).collection('public').doc('data').collection('years').doc(selectedYearId)
                          .collection('classes').doc(selectedClassId).collection('students');
                        for (const name of names) await col.add({ name, status: 'active', createdAt: Date.now() });
                        setBulkInput(''); setModalType(null);
                        showToast(`Đã thêm ${names.length} học sinh thành công`, 'success', '✅', 3000);
                      })() : (async () => {
                        const colName = modalType === 'year' ? 'years' : modalType === 'class' ? 'classes' : modalType === 'month' ? 'months' : 'subjects';
                        const col = db.collection('artifacts').doc(appId).collection('public').doc('data').collection(colName);
                        if (editItem) {
                          await col.doc(editItem.id).update({ name: inputValue });
                          showToast('Cập nhật thành công', 'success', '✅', 3000);
                        } else {
                          await col.add({ name: inputValue, createdAt: Date.now() });
                          showToast('Thêm mới thành công', 'success', '✅', 3000);
                        }
                        setInputValue(''); setModalType(null);
                      })()} className="flex-[2] py-4 bg-indigo-600 text-white font-black rounded-xl uppercase text-[10px]">Lưu</button>
                    </div>
                  </div>
                </div>
              )}

              {confirmDelete && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
                  <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl border-t-8 border-red-600">
                    <h3 className="text-lg font-black mb-2 uppercase">Xác nhận xóa</h3>
                    <p className="text-slate-500 text-sm mb-6">Xóa <span className="text-red-600 font-bold">"{confirmDelete.name}"</span>?</p>
                    <div className="flex gap-4">
                      <button onClick={() => setConfirmDelete(null)} className="flex-1 py-4 font-black text-slate-400 uppercase text-[10px]">Hủy</button>
                      <button onClick={async () => {
                        try {
                          if (confirmDelete.type === 'student') {
                            await db.collection('artifacts').doc(appId).collection('public').doc('data').collection('years').doc(selectedYearId)
                              .collection('classes').doc(selectedClassId).collection('students').doc(confirmDelete.id).delete();
                          } else {
                            const colName = confirmDelete.type === 'year' ? 'years' : confirmDelete.type === 'class' ? 'classes' : confirmDelete.type === 'month' ? 'months' : 'subjects';
                            await db.collection('artifacts').doc(appId).collection('public').doc('data').collection(colName).doc(confirmDelete.id).delete();
                          }
                          setConfirmDelete(null);
                          showToast('Xóa thành công', 'success', '✅', 3000);
                        } catch (e) {
                          showToast('Lỗi xóa: ' + e.message, 'error', '❌', 4000);
                        }
                      }} className="flex-1 py-4 bg-red-600 text-white font-black rounded-xl uppercase text-[10px]">Xóa</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
  
