# Security Specification for TrainerPro

## 1. Data Invariants
- A `StudentProfile` must have a valid `userId` (the student) and `ptId` (the coach).
- Only the assigned Personal Trainer or the student themselves can read a `StudentProfile`.
- A `WorkoutPlan` can only be created by a Personal Trainer.
- `ExerciseInstance` documents belong to a `Workout`, which belongs to a `WorkoutPlan`. Access is hierarchical.
- `FinancialRecord` documents are private between the PT and the student.
- `WorkoutLog` can only be created by the student.

## 2. Dirty Dozen Payloads (Targeting Failures)

1. **Identity Spoofing**: Attempt to create a student profile with a `userId` that is not the current user.
2. **Role Escalation**: Student attempting to create a `WorkoutPlan`.
3. **Ghost Field Injection**: Adding `isVerified: true` to a user document.
4. **ID Poisoning**: Using a 2KB string as a document ID for a workout.
5. **PII Leak**: Non-assigned PT trying to list all student profiles.
6. **Relational Bypass**: Creating a workout for a plan that belongs to another PT.
7. **Negative Payment**: Setting `amount: -100` in a `FinancialRecord`.
8. **Future Log**: Logging a workout with a `completedAt` date in 2030.
9. **Orphaned Exercise**: Creating an exercise instance without a workoutId.
10. **State Shortcut**: Changing a financial record from 'pending' to 'paid' as a student.
11. **Bulk Scrape**: Querying `/users` without any filter.
12. **System Field Overwrite**: Overwriting `createdAt` on a user document.

## 3. Test Runner (Draft)
A comprehensive test suite in `firestore.rules.test.ts` will verify that these payloads are denied.
