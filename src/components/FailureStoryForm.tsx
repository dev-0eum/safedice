"use client";

import { useState } from "react";

type Step = 0 | 1 | 2 | 3;

interface FormData {
  incident: string;
  result: string;
  lesson: string;
  anonymous: boolean;
}

const STEPS = [
  {
    key: "incident" as const,
    label: "사건",
    emoji: "⚡",
    title: "무슨 일이 있었나요?",
    description: "실패했던 상황을 구체적으로 적어주세요. 판단 없이 사실 그대로 괜찮아요.",
    placeholder: "예) 팀 프레젠테이션 준비를 너무 늦게 시작해서 자료를 완성하지 못했어요...",
    maxLength: 500,
  },
  {
    key: "result" as const,
    label: "결과",
    emoji: "🌊",
    title: "어떤 결과가 생겼나요?",
    description: "그 실패가 가져온 결과를 솔직하게 적어주세요. 감정도 함께 써도 좋아요.",
    placeholder: "예) 발표 당일 준비가 안 된 채로 발표했고, 팀원들에게 미안함과 자책감을 느꼈어요...",
    maxLength: 500,
  },
  {
    key: "lesson" as const,
    label: "배운점",
    emoji: "🌱",
    title: "그 경험에서 무엇을 배웠나요?",
    description: "실패를 통해 얻은 깨달음이나 다음에 다르게 할 것을 적어주세요.",
    placeholder: "예) 큰 과제는 작은 단계로 나눠서 일정을 짜야 한다는 걸 몸으로 배웠어요...",
    maxLength: 500,
  },
];

const STEP_COLORS = [
  { ring: "ring-blue-400", dot: "bg-blue-500", badge: "bg-blue-50 text-blue-700 border-blue-200" },
  { ring: "ring-indigo-400", dot: "bg-indigo-500", badge: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { ring: "ring-teal-400", dot: "bg-teal-500", badge: "bg-teal-50 text-teal-700 border-teal-200" },
];

export default function FailureStoryForm() {
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormData>({
    incident: "",
    result: "",
    lesson: "",
    anonymous: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const currentStepData = STEPS[step as number];
  const currentColor = STEP_COLORS[step as number];
  const currentValue = step < 3 ? form[currentStepData?.key] : "";

  const isCurrentFilled = step >= 3 || currentValue.trim().length > 0;

  function handleChange(value: string) {
    if (step >= 3) return;
    setForm((prev) => ({ ...prev, [currentStepData.key]: value }));
  }

  function handleNext() {
    if (step < 2) setStep((s) => (s + 1) as Step);
    else if (step === 2) setStep(3);
  }

  function handleBack() {
    if (step > 0) setStep((s) => (s - 1) as Step);
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function handleReset() {
    setForm({ incident: "", result: "", lesson: "", anonymous: true });
    setStep(0);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎲</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">용감하게 나눠줘서 고마워요</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            당신의 실패 경험이 누군가에게<br />
            큰 용기와 배움이 될 거예요.
          </p>
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 text-left mb-8 space-y-4">
            {STEPS.map((s, i) => (
              <div key={s.key}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{s.emoji}</span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{s.label}</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed pl-6">
                  {form[s.key] || <span className="text-slate-300 italic">입력 없음</span>}
                </p>
                {i < STEPS.length - 1 && <div className="border-t border-slate-100 mt-4" />}
              </div>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            새로운 경험 나누기
          </button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4 shadow-md shadow-blue-200">
              <span className="text-2xl">🎲</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800">이야기를 확인해 주세요</h2>
            <p className="text-sm text-slate-500 mt-1">게시 전에 한 번 더 살펴볼 수 있어요.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 divide-y divide-slate-100 mb-6">
            {STEPS.map((s, i) => (
              <div key={s.key} className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${STEP_COLORS[i].dot}`}>
                      {i + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{s.label}</span>
                  </div>
                  <button
                    onClick={() => setStep(i as Step)}
                    className="text-xs text-blue-500 hover:text-blue-700 font-medium"
                  >
                    수정
                  </button>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed pl-8">
                  {form[s.key] || <span className="text-slate-300 italic">입력 없음</span>}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-blue-100 p-4 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={form.anonymous}
                  onChange={(e) => setForm((prev) => ({ ...prev, anonymous: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 rounded border-2 border-blue-300 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors flex items-center justify-center">
                  {form.anonymous && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">익명으로 게시하기</p>
                <p className="text-xs text-slate-400 mt-0.5">내 이름 대신 &apos;안전한 주사위&apos;로 표시돼요.</p>
              </div>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 active:scale-[0.98] transition-all"
            >
              이전
            </button>
            <button
              onClick={handleSubmit}
              className="flex-[2] py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-200"
            >
              게시하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4 shadow-md shadow-blue-200">
            <span className="text-2xl">🎲</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">Safe-Dice</h1>
          <p className="text-sm text-slate-500 mt-1">실패도 안전하게 나눌 수 있어요</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i === step
                      ? `${STEP_COLORS[i].dot} text-white shadow-md`
                      : i < step
                      ? "bg-blue-200 text-blue-700"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {i < step ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`text-xs font-medium transition-colors ${i === step ? "text-slate-700" : "text-slate-400"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 h-px transition-colors ${i < step ? "bg-blue-300" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mb-4">
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${currentColor.badge}`}
            >
              <span>{currentStepData.emoji}</span>
              <span>{currentStepData.label}</span>
            </span>
          </div>

          <h2 className="text-lg font-bold text-slate-800 mb-1.5">{currentStepData.title}</h2>
          <p className="text-sm text-slate-500 mb-5 leading-relaxed">{currentStepData.description}</p>

          <div className="relative">
            <textarea
              value={currentValue}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={currentStepData.placeholder}
              maxLength={currentStepData.maxLength}
              rows={6}
              className={`w-full resize-none rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 leading-relaxed outline-none transition-all ring-2 ring-transparent focus:ring-2 focus:bg-white ${currentColor.ring} focus:border-transparent border-slate-200`}
            />
            <span className="absolute bottom-3 right-4 text-xs text-slate-300 tabular-nums">
              {currentValue.length}/{currentStepData.maxLength}
            </span>
          </div>
        </div>

        {/* Tip */}
        <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6">
          <span className="text-blue-400 mt-0.5 text-sm flex-shrink-0">💡</span>
          <p className="text-xs text-blue-600 leading-relaxed">
            {step === 0 && "판단 없이 솔직하게 적어도 괜찮아요. 여기는 안전한 공간이에요."}
            {step === 1 && "결과가 나빴더라도 괜찮아요. 그 감정도 소중한 기록이에요."}
            {step === 2 && "거창하지 않아도 돼요. 작은 깨달음도 누군가에겐 큰 배움이 돼요."}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 active:scale-[0.98] transition-all"
            >
              이전
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isCurrentFilled}
            className={`flex-[2] py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] ${
              isCurrentFilled
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {step === 2 ? "검토하기" : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
}
