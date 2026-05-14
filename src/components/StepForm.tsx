"use client";

import { useState } from "react";
import { PostType, PostSection } from "@/types";

const STEP_CONFIGS: Record<PostType, Array<{ label: string; emoji: string; title: string; description: string; placeholder: string }>> = {
  experience: [
    {
      label: '사건', emoji: '⚡',
      title: '무슨 일이 있었나요?',
      description: '실패했던 상황을 솔직하게 적어주세요. 판단 없이 사실 그대로 괜찮아요.',
      placeholder: '예) 팀 프레젠테이션 준비를 너무 늦게 시작해서 자료를 완성하지 못했어요...',
    },
    {
      label: '결과', emoji: '🌊',
      title: '어떤 결과가 생겼나요?',
      description: '그 실패가 가져온 결과를 솔직하게 적어주세요. 감정도 함께 써도 좋아요.',
      placeholder: '예) 발표가 엉망이었고, 팀원들에게 미안함과 자책감을 느꼈어요...',
    },
    {
      label: '배운점', emoji: '🌱',
      title: '무엇을 배웠나요?',
      description: '실패를 통해 얻은 깨달음이나 다음에 다르게 할 것을 적어주세요.',
      placeholder: '예) 큰 과제는 작은 단계로 나눠서 미리 시작해야 한다는 걸 배웠어요...',
    },
  ],
  attitude: [
    {
      label: '상황', emoji: '🌟',
      title: '어떤 상황이었나요?',
      description: '성공적인 태도를 발휘했던 배경을 설명해주세요.',
      placeholder: '예) 처음 팀장 역할을 맡았는데 경험이 없어 무엇부터 해야 할지 막막했어요...',
    },
    {
      label: '태도', emoji: '💪',
      title: '어떤 태도를 취했나요?',
      description: '그 상황에서 어떻게 생각하고 행동했는지 구체적으로 적어주세요.',
      placeholder: '예) 모르는 것을 인정하고, 팀원들에게 솔직하게 도움을 요청했어요...',
    },
    {
      label: '성과', emoji: '🏆',
      title: '어떤 성과가 있었나요?',
      description: '그 태도가 만들어낸 결과나 깨달음을 적어주세요.',
      placeholder: '예) 팀원들이 더 적극적으로 도와줬고, 프로젝트를 성공적으로 마무리했어요...',
    },
  ],
};

const COLORS: Record<PostType, Array<{ ring: string; dot: string; badgeBg: string; badgeText: string }>> = {
  experience: [
    { ring: 'focus:ring-blue-400', dot: 'bg-blue-500', badgeBg: 'bg-blue-50', badgeText: 'text-blue-700' },
    { ring: 'focus:ring-indigo-400', dot: 'bg-indigo-500', badgeBg: 'bg-indigo-50', badgeText: 'text-indigo-700' },
    { ring: 'focus:ring-teal-400', dot: 'bg-teal-500', badgeBg: 'bg-teal-50', badgeText: 'text-teal-700' },
  ],
  attitude: [
    { ring: 'focus:ring-amber-400', dot: 'bg-amber-500', badgeBg: 'bg-amber-50', badgeText: 'text-amber-700' },
    { ring: 'focus:ring-emerald-400', dot: 'bg-emerald-500', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-700' },
    { ring: 'focus:ring-green-400', dot: 'bg-green-500', badgeBg: 'bg-green-50', badgeText: 'text-green-700' },
  ],
};

const TIPS: Record<PostType, string[]> = {
  experience: [
    '판단 없이 솔직하게 적어도 괜찮아요. 여기는 안전한 공간이에요.',
    '결과가 나빴더라도 괜찮아요. 그 감정도 소중한 기록이에요.',
    '거창하지 않아도 돼요. 작은 깨달음도 누군가에겐 큰 배움이 돼요.',
  ],
  attitude: [
    '성공의 크기는 상관없어요. 일상의 작은 성공도 소중해요.',
    '어떤 생각과 선택이 그 결과를 만들었는지 구체적으로 적어주세요.',
    '결과보다 그 경험에서 느낀 것이 더 소중할 수 있어요.',
  ],
};

interface StepFormProps {
  type: PostType;
  initialSections?: PostSection[];
  initialAnonymous?: boolean;
  isEditing?: boolean;
  onSubmit: (sections: PostSection[], anonymous: boolean) => void;
  onCancel: () => void;
}

type FormStep = 0 | 1 | 2 | 3;

export default function StepForm({
  type,
  initialSections,
  initialAnonymous = true,
  isEditing = false,
  onSubmit,
  onCancel,
}: StepFormProps) {
  const steps = STEP_CONFIGS[type];
  const colors = COLORS[type];

  const [currentStep, setCurrentStep] = useState<FormStep>(0);
  const [values, setValues] = useState<string[]>(
    initialSections ? initialSections.map((s) => s.content) : ['', '', '']
  );
  const [anonymous, setAnonymous] = useState(initialAnonymous);

  const isReview = currentStep === 3;
  const config = steps[currentStep as number];
  const color = colors[currentStep as number];
  const currentValue = isReview ? '' : values[currentStep];
  const canProceed = isReview || currentValue.trim().length > 0;

  const isExp = type === 'experience';
  const primaryBtn = isExp
    ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
    : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200';
  const tipBg = isExp ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600';

  function handleValueChange(val: string) {
    setValues((prev) => {
      const next = [...prev];
      next[currentStep] = val;
      return next;
    });
  }

  function handleNext() {
    setCurrentStep((s) => (Math.min(s + 1, 3)) as FormStep);
  }

  function handleBack() {
    setCurrentStep((s) => (Math.max(s - 1, 0)) as FormStep);
  }

  function handleSubmit() {
    const sections: PostSection[] = steps.map((step, i) => ({
      label: step.label,
      emoji: step.emoji,
      content: values[i],
    }));
    onSubmit(sections, anonymous);
  }

  return (
    <div className="flex flex-col h-full bg-[#f0f6ff]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-100 flex-shrink-0">
        <button
          onClick={isReview ? handleBack : onCancel}
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-base font-bold text-slate-800 flex-1">
          {isReview ? '검토하기' : isEditing ? '수정하기' : isExp ? '경험 나누기' : '태도 공유하기'}
        </h2>
      </div>

      {/* Step indicator */}
      {!isReview && (
        <div className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-b border-slate-50 flex-shrink-0">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i === currentStep
                  ? `${colors[i].dot} text-white shadow-sm`
                  : i < currentStep
                  ? 'bg-blue-200 text-blue-700'
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {i < currentStep ? (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={`text-xs font-medium ${i === currentStep ? 'text-slate-700' : 'text-slate-400'}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`w-5 h-px ml-1 ${i < currentStep ? 'bg-blue-300' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {isReview ? (
          <>
            <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100">
              {steps.map((step, i) => (
                <div key={step.label} className="p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${colors[i].dot}`}>
                        {i + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        {step.emoji} {step.label}
                      </span>
                    </div>
                    <button
                      onClick={() => setCurrentStep(i as FormStep)}
                      className="text-xs text-blue-500 hover:text-blue-700 font-medium"
                    >
                      수정
                    </button>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed pl-7">
                    {values[i] || <span className="text-slate-300 italic">입력 없음</span>}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-100 p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    anonymous
                      ? isExp ? 'bg-indigo-600 border-indigo-600' : 'bg-emerald-600 border-emerald-600'
                      : 'border-slate-300 bg-white'
                  }`}
                  onClick={() => setAnonymous((v) => !v)}
                >
                  {anonymous && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div onClick={() => setAnonymous((v) => !v)}>
                  <p className="text-sm font-semibold text-slate-700">익명으로 게시하기</p>
                  <p className="text-xs text-slate-400 mt-0.5">내 이름 대신 &apos;익명&apos;으로 표시돼요.</p>
                </div>
              </label>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${color.badgeBg} ${color.badgeText}`}>
                {config.emoji} {config.label}
              </span>
              <h3 className="text-base font-bold text-slate-800 mb-1.5">{config.title}</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">{config.description}</p>
              <div className="relative">
                <textarea
                  value={currentValue}
                  onChange={(e) => handleValueChange(e.target.value)}
                  placeholder={config.placeholder}
                  maxLength={500}
                  rows={6}
                  className={`w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 leading-relaxed outline-none transition-all ring-2 ring-transparent focus:bg-white focus:border-transparent ${color.ring}`}
                />
                <span className="absolute bottom-3 right-4 text-xs text-slate-300 tabular-nums">
                  {currentValue.length}/500
                </span>
              </div>
            </div>

            <div className={`flex items-start gap-2 rounded-xl px-4 py-3 border ${tipBg}`}>
              <span className="mt-0.5 text-sm flex-shrink-0">💡</span>
              <p className="text-xs leading-relaxed">{TIPS[type][currentStep]}</p>
            </div>
          </>
        )}
      </div>

      {/* Footer nav */}
      <div className="px-4 py-4 bg-white border-t border-slate-100 flex gap-3 flex-shrink-0">
        {currentStep > 0 && !isReview && (
          <button
            onClick={handleBack}
            className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 active:scale-[0.98] transition-all"
          >
            이전
          </button>
        )}
        {isReview ? (
          <button
            onClick={handleSubmit}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all active:scale-[0.98] shadow-md ${primaryBtn}`}
          >
            {isEditing ? '수정 완료' : '게시하기'}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex-[2] py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] ${
              canProceed
                ? `text-white shadow-md ${primaryBtn}`
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {currentStep === 2 ? '검토하기' : '다음'}
          </button>
        )}
      </div>
    </div>
  );
}
