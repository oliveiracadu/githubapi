@extends('layouts.app')
<script>    
    let ownerName = null
    @if (isset($ownerName)) 
        ownerNameGlobal = `{{$ownerName}}`;
    @endif    
</script>
@section('content')
    <div id="owner"></div>
@endsection
