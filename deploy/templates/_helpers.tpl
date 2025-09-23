{{- define "ham.fullname" -}}
{{- if .Chart.Name -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
ham
{{- end -}}
{{- end -}}
